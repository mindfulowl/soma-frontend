import { useCallback, useState } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import FilterList from "./components/FilterList";
import MobileFilterList, {
  AnchorPositionEnum,
} from "./components/MobileFilterList";
import ProductCard, { Product } from "./components/ProductCard";
import useWindowResize, {
  WindowSizeEnum,
} from "../../shared/hooks/useWindowResize";
import { Breakpoints } from "../../shared/styles";

const FAKE_PRODUCT_DATA: Array<Product> = [
  {
    name: "Happy Tummy",
    activeIngredients: ["Salivarius", "Lactobacillius", "Vitamin C"],
    inActiveIngredients: [
      "purified talc",
      "stearic acid",
      "povidone",
      "starch pregelatinised",
    ],
    imageUrl:
      "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/gettyimages-169371459.jpg?itok=eZUqM9o2",
  },
  {
    name: "Mega Strength",
    activeIngredients: ["Salivarius", "Lactobacillius", "Vitamin C"],
    inActiveIngredients: [
      "purified talc",
      "stearic acid",
      "povidone",
      "starch pregelatinised",
    ],
    imageUrl:
      "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/gettyimages-169371459.jpg?itok=eZUqM9o2",
  },
  {
    name: "Pre Natal Complex",
    activeIngredients: ["Salivarius", "Lactobacillius", "Vitamin C"],
    inActiveIngredients: [
      "purified talc",
      "stearic acid",
      "povidone",
      "starch pregelatinised",
    ],
    imageUrl:
      "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/gettyimages-169371459.jpg?itok=eZUqM9o2",
  },
  {
    name: "Night Nurse Cold & Flu",
    activeIngredients: ["Salivarius", "Lactobacillius", "Vitamin C"],
    inActiveIngredients: [
      "purified talc",
      "stearic acid",
      "povidone",
      "starch pregelatinised",
    ],
    imageUrl:
      "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/gettyimages-169371459.jpg?itok=eZUqM9o2",
  },
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
  const [isMobileDrawOpen, setIsMobileDrawOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<WindowSizeEnum>(
    window.innerWidth > Breakpoints.md
      ? WindowSizeEnum.LARGE
      : WindowSizeEnum.SMALL
  );

  const updateFilters = (newFilter: string) => {
    setSelectedFilters([...(selectedFilters || []), newFilter]);
  };

  const clearFilters = () => {
    setSelectedFilters(null);
  };

  const toggleMobileFilters = () => {
    setIsMobileDrawOpen(!isMobileDrawOpen);
  };
  const setSize = useCallback((dimensions: any) => {
    if (dimensions.width > Breakpoints.md) {
      setScreenSize(WindowSizeEnum.LARGE);
    } else {
      setScreenSize(WindowSizeEnum.SMALL);
    }
  }, []);

  useWindowResize(setSize);

  console.log(selectedFilters);

  return (
    <PageWrapper>
      {screenSize === WindowSizeEnum.LARGE ? (
        <FilterList
          setSelectedFilters={updateFilters}
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
        />
      ) : (
        <>
          <MenuIcon onClick={toggleMobileFilters} />
          <MobileFilterList
            setSelectedFilters={updateFilters}
            selectedFilters={selectedFilters}
            isOpen={isMobileDrawOpen}
            anchorPosition={AnchorPositionEnum.OPEN_LEFT}
            setIsOpen={toggleMobileFilters}
            clearFilters={clearFilters}
          />
        </>
      )}
      <ProductsWrapper>
        {FAKE_PRODUCT_DATA.map((product) => {
          return <ProductCard productData={product} key={product.name} />;
        })}
      </ProductsWrapper>
    </PageWrapper>
  );
};

export default ProductsPage;
