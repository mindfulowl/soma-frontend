import { useState, useCallback, useContext, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import MobileFilterList, {
  AnchorPositionEnum,
} from "../../../shared/components/MobileFilterList";
import { MultiSelectOption } from "../../../shared/components/MultiSelect";
import useWindowResize, {
  Dimensions,
  WindowSizeEnum,
} from "../../../shared/hooks/useWindowResize";
import { Breakpoints } from "../../../shared/styles";
import PractitionerCard from "../components/PractitionerCard";
import FilterList from "../../../shared/components/FilterList";
import { removeNullProperties } from "../../products/product.utils";
import axios from "axios";
import { UserContext } from "../../../shared/contexts/UserContext";
import {
  Practitioner,
  practitioner_CONSULATION_TYPE_OPTIONS,
  practitioner_DISCIPLINE_OPTIONS,
  practitioner_HEALTH_CONCERNS_OPTIONS,
} from "../types/practitioner.types";

export const FILTER_PRACTITIONER_BUTTON_DATA = [
  { name: "Consultation Type", apiKey: "consultations" },
  { name: "Discipline", apiKey: "disciplines" },
  { name: "Health Concerns", apiKey: "healthConcerns" },
];

export const FILTER_PRACTITIONER_OPTIONS = {
  consultations: practitioner_CONSULATION_TYPE_OPTIONS,
  healthConcerns: practitioner_HEALTH_CONCERNS_OPTIONS,
  disciplines: practitioner_DISCIPLINE_OPTIONS,
};

export const FAKE_PRACTITIONER_DATA = [
  {
    name: "Joshua Da Costa",
    discipline: "Chemist",
    distance: "0.5 from E5",
    number: "0751483970",
    email: "Test@Test.com",
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    healthConcerns: ["Gut Health", "Immunity", "Dietary"],
  },
  {
    name: "Daniel Holmes",
    discipline: "Doctor",
    distance: "0.5 from E5",
    number: "0751483970",
    email: "Test@Test.com",
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    healthConcerns: ["Gut Health", "Immunity", "Dietary"],
  },
  {
    name: "Francais Drake",
    discipline: "Chemist",
    distance: "0.5 from E5",
    number: "0751483970",
    email: "Test@Test.com",
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    healthConcerns: ["Gut Health", "Immunity", "Dietary"],
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
  const [practitioners, setPractitioners] = useState<Array<any>>([]);
  const [productFilterApiParams, setProductFilterApiParams] = useState({});
  const [isMobileDrawOpen, setIsMobileDrawOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<WindowSizeEnum>(
    window.innerWidth > Breakpoints.md
      ? WindowSizeEnum.LARGE
      : WindowSizeEnum.SMALL
  );

  const updateFilters = (newFilter: string) => {
    setSelectedFilters([...(selectedFilters || []), newFilter]);
  };

  const { currentUser } = useContext(UserContext);

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
    filterValues: Array<MultiSelectOption> | null
  ) => {
    const values =
      filterValues &&
      filterValues.map((filterValue: MultiSelectOption) => filterValue.name);

    setProductFilterApiParams({
      ...productFilterApiParams,
      [filterName]: values,
    });
  };

  const getPractitioners = async () => {
    const input = removeNullProperties({
      ...productFilterApiParams,
    });
    try {
      const newPractitionerList = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/practitioners/search`,
        input,
        {
          headers: {
            Authorization: currentUser?.idToken,
          },
        }
      );
      setPractitioners(newPractitionerList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPractitioners();
  }, [productFilterApiParams, currentUser?.idToken]);

  return (
    <PageWrapper>
      {screenSize === WindowSizeEnum.LARGE ? (
        <FilterList
          setSelectedFilters={updateFilters}
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
          constructApiFilters={constructApiFilters}
          filterButtons={FILTER_PRACTITIONER_BUTTON_DATA}
          filterOptions={FILTER_PRACTITIONER_OPTIONS}
        />
      ) : (
        <>
          <MenuIcon onClick={toggleMobileFilters} />
          <MobileFilterList
            filterOptions={FILTER_PRACTITIONER_OPTIONS}
            setSelectedFilters={updateFilters}
            selectedFilters={selectedFilters}
            isOpen={isMobileDrawOpen}
            anchorPosition={AnchorPositionEnum.OPEN_LEFT}
            setIsOpen={toggleMobileFilters}
            clearFilters={clearFilters}
            constructApiFilters={constructApiFilters}
            filterButtons={FILTER_PRACTITIONER_BUTTON_DATA}
          />
        </>
      )}
      <ProductsWrapper>
        {practitioners.map((practitioner: Practitioner) => {
          return <PractitionerCard practitionerData={practitioner} />;
        })}
      </ProductsWrapper>
    </PageWrapper>
  );
};

export default ProductsPage;
