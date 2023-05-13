import { Button } from "@mui/material";
import styled from "styled-components";
import { MultiSelectOption } from "../../../shared/components/MultiSelect";
import { screenMdMin } from "../../../shared/styles";
import FilterControls from "./FilterControls";

export const FILTER_BUTTON_DATA = [
  { name: "Product Name", apiKey: "name" },
  { name: "Brand", apiKey: "brand" },
  { name: "Active Ingredients", apiKey: "activeIngredients" },
  { name: "Inactive Ingredients", apiKey: "inactiveIngredients" },
  { name: "Allergns", apiKey: "allergns" },
  { name: "Product Form", apiKey: "productForm" },
  { name: "Dietary Requirements", apiKey: "dietaryRequirements" },
  { name: "Adults", apiKey: "adults" },
  { name: "Kids Friendly", apiKey: "kidsFriendly" },
  { name: "Pregnancy Friendly", apiKey: "pregnancyFriendly" },
  { name: "Brand Recommendation", apiKey: "brandRecommendation" },
  { name: "Country", apiKey: "country" },
];

type StyledButtonFilterProps = {
  active: boolean | undefined;
};

type FilterListProps = {
  setSelectedFilters: (selectedFilter: string) => void;
  selectedFilters: Array<string> | null;
  clearFilters: () => void;
  constructApiFilters: (
    filterName: string,
    values: Array<MultiSelectOption> | null,
    productNameFilter?: string
  ) => void;
};

const DividerLine = styled.div`
  height: 2px;
  background-color: var(--color-grey);
  margin: var(--spacing-md);
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background-color: var(--color-white);
  border-radius: 10px;
  @media ${screenMdMin} {
    width: 35%;
  }
`;

const StyledButtonFilter = styled(Button)<StyledButtonFilterProps>`
  color: var(--color-black);
  border: 2px solid var(--color-grey-light);
  border-radius: 20px;
  font-size: var(--font-size-medium-sm);
  margin: var(--spacing-xs) 0;

  :hover {
    border: 2px solid var(--color-grey-light);
  }

  @media ${screenMdMin} {
    background-color: ${({ active }) =>
      active ? "var(--color-grey)" : "var(--color-white)"};
  }
`;

const FilterList = (props: FilterListProps) => {
  const {
    selectedFilters,
    setSelectedFilters,
    clearFilters,
    constructApiFilters,
  } = props;

  return (
    <FilterWrapper>
      <StyledButtonFilter
        variant="outlined"
        active={false}
        onClick={clearFilters}
      >
        Clear Filters
      </StyledButtonFilter>
      <DividerLine />
      {FILTER_BUTTON_DATA.map((filter) => {
        return (
          <>
            <StyledButtonFilter
              key={filter.name}
              active={selectedFilters?.includes(filter.name) ? true : undefined}
              variant="outlined"
              onClick={() => setSelectedFilters(filter.name)}
            >
              {filter.name}
            </StyledButtonFilter>
            {selectedFilters?.includes(filter.name) && (
              <FilterControls
                filterName={filter.name}
                filterQueryStringName={filter.apiKey || ""}
                constructApiFilters={constructApiFilters}
              />
            )}
          </>
        );
      })}
    </FilterWrapper>
  );
};

export default FilterList;
