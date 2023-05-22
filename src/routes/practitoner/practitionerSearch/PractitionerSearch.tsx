import { useState, useCallback } from "react";
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

export const FILTER_PRACTITIONER_BUTTON_DATA = [
  { name: "Consultation Type", apiKey: "consultationType" },
  { name: "Discipline", apiKey: "discipline" },
  { name: "Health Concerns", apiKey: "healthConcerns" },
];

export const FAKE_PRACTITIONER_DATA = [
  {
    name: "Joshua Da Costa",
    discipline: "Chemist",
    distance: "0.5 from E5",
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    healthConcerns: ["Gut Health", "Immunity", "Dietary"],
  },
  {
    name: "Daniel Holmes",
    discipline: "Doctor",
    distance: "0.5 from E5",
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    healthConcerns: ["Gut Health", "Immunity", "Dietary"],
  },
  {
    name: "Francais Drake",
    discipline: "Chemist",
    distance: "0.5 from E5",
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

  return (
    <PageWrapper>
      {screenSize === WindowSizeEnum.LARGE ? (
        <FilterList
          setSelectedFilters={updateFilters}
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
          constructApiFilters={constructApiFilters}
          filterButtons={FILTER_PRACTITIONER_BUTTON_DATA}
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
            constructApiFilters={constructApiFilters}
            filterButtons={FILTER_PRACTITIONER_BUTTON_DATA}
          />
        </>
      )}
      <ProductsWrapper>
        {FAKE_PRACTITIONER_DATA.map((practitioner) => {
          return <PractitionerCard practitionerData={practitioner} />;
        })}
      </ProductsWrapper>
    </PageWrapper>
  );
};

export default ProductsPage;
