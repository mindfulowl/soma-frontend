import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import FilterList from "../../shared/components/FilterList";
import MobileFilterList, {
  AnchorPositionEnum,
} from "../../shared/components/MobileFilterList";
import ProductCard, { Product } from "./components/ProductCard";
import useWindowResize, {
  Dimensions,
  WindowSizeEnum,
} from "../../shared/hooks/useWindowResize";
import { Breakpoints } from "../../shared/styles";
import { removeNullProperties } from "./product.utils";
import { MultiSelectOption } from "../../shared/components/MultiSelect";
import { UserContext } from "../../shared/contexts/UserContext";
import NotFoundCard from "../../shared/components/NotFoundCard";
import { FilterOptions } from "../../shared/components/FilterControls";
import NotAMemberCard from "./components/NotAMember";

export const FILTER_BUTTON_DATA = [
  { name: "Product Name", apiKey: "name" },
  { name: "Brand", apiKey: "brands" },
  { name: "Active Ingredients", apiKey: "activeIngredients" },
  { name: "Inactive Ingredients", apiKey: "inactiveIngredients" },
  { name: "Health Concerns", apiKey: "healthConcerns" },
  { name: "Capsule Ingredients", apiKey: "capsuleIngredients" },
  { name: "Allergens", apiKey: "allergens" },
  { name: "Product Form", apiKey: "productForms" },
  { name: "Dietary Requirements", apiKey: "dietaryRequirements" },
  { name: "Kids Friendly", apiKey: "kids" },
  { name: "Pregnancy Friendly", apiKey: "pregnancyFriendlyFlags" },
  { name: "Country", apiKey: "countries" },
  { name: "Adult", apiKey: "adult" },
];

const PageWrapper = styled.div`
  display: flex;
  padding: var(--spacing-md);
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: var(--spacing-md);
  width: 100%;
`;

const ProductsPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<Array<string> | null>(
    null
  );
  const [productFilterApiParams, setProductFilterApiParams] = useState({});
  const [products, setProducts] = useState<Array<Product>>([]);
  const [isMobileDrawOpen, setIsMobileDrawOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>();
  const [screenSize, setScreenSize] = useState<WindowSizeEnum>(
    window.innerWidth > Breakpoints.md
      ? WindowSizeEnum.LARGE
      : WindowSizeEnum.SMALL
  );

  const { currentUser } = useContext(UserContext);

  const updateFilters = (newFilter: string) => {
    setSelectedFilters([...(selectedFilters || []), newFilter]);
  };

  const clearFilters = () => {
    setSelectedFilters(null);
    setProductFilterApiParams({});
  };

  const toggleMobileFilters = () => {
    setIsMobileDrawOpen(!isMobileDrawOpen);
  };

  const setSize = useCallback((dimensions: Dimensions) => {
    if (dimensions.width > Breakpoints.md) {
      setScreenSize(WindowSizeEnum.LARGE);
    } else {
      setScreenSize(WindowSizeEnum.SMALL);
    }
  }, []);

  useWindowResize(setSize);

  const constructApiFilters = (
    filterName: string,
    filterValues: Array<MultiSelectOption> | null,
    productNameFilterValue?: string
  ) => {
    if (filterName === "name") {
      setProductFilterApiParams({
        ...productFilterApiParams,
        [filterName]: productNameFilterValue,
      });
      return;
    }

    const values =
      filterValues &&
      filterValues.map((filterValue: MultiSelectOption) => filterValue.name);

    setProductFilterApiParams({
      ...productFilterApiParams,
      [filterName]: values,
    });
  };

  const getProducts = async () => {
    const input = removeNullProperties({
      ...productFilterApiParams,
    });

    const newProductList = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/products/search`,
      input,
      {
        headers: {
          Authorization: currentUser?.idToken,
        },
      }
    );
    setProducts(newProductList.data);
  };

  const getFilterOptions = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/filter-options`
    );

    const filterListOptions = Object.keys(res.data).map(
      (filterOption: string) => {
        return {
          filterName: [filterOption],
          value: res.data[filterOption].map((values: Array<string>) => {
            return { name: values };
          }),
        };
      }
    );

    const filters: FilterOptions = filterListOptions.reduce(
      (obj, filter) => ({
        ...obj,
        [filter.filterName.toString()]: filter.value,
      }),
      {}
    );

    setFilterOptions(filters);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFilterApiParams, currentUser?.idToken]);

  useEffect(() => {
    getFilterOptions();
  }, []);

  return (
    <PageWrapper>
      {screenSize === WindowSizeEnum.LARGE ? (
        <FilterList
          setSelectedFilters={updateFilters}
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
          constructApiFilters={constructApiFilters}
          filterButtons={FILTER_BUTTON_DATA}
          filterOptions={filterOptions}
        />
      ) : (
        <>
          <MenuIcon onClick={toggleMobileFilters} />
          <MobileFilterList
            filterOptions={filterOptions}
            setSelectedFilters={updateFilters}
            selectedFilters={selectedFilters}
            isOpen={isMobileDrawOpen}
            anchorPosition={AnchorPositionEnum.OPEN_LEFT}
            setIsOpen={toggleMobileFilters}
            clearFilters={clearFilters}
            constructApiFilters={constructApiFilters}
            filterButtons={FILTER_BUTTON_DATA}
          />
        </>
      )}
      <ProductsWrapper>
        {!currentUser?.isMember ? (
          <NotAMemberCard />
        ) : products.length > 0 ? (
          products.map((product, i) => (
            <ProductCard key={i} productData={product} />
          ))
        ) : (
          <NotFoundCard />
        )}
      </ProductsWrapper>
    </PageWrapper>
  );
};

export default ProductsPage;
