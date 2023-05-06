import { Button } from "@mui/material";
import styled from "styled-components";
import { screenMdMin } from "../../../shared/styles";
import FilterControls from "./FilterControls";

type StyledByttonFilterProps = {
  active: boolean | undefined;
};

type FilterListProps = {
  setSelectedFilters: (selectedFilter: string) => void;
  selectedFilters: Array<string> | null;
  clearFilters: () => void;
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

export const StyledButtonFilter = styled(Button)<StyledByttonFilterProps>`
  background-color: ${({ active }) =>
    active ? "var(--color-grey)" : "var(--color-white)"};
  color: var(--color-black);
  border: 2px solid var(--color-grey-light);
  border-radius: 20px;
  font-size: var(--font-size-medium-sm);
  margin: var(--spacing-xs) 0;

  :hover {
    border: 2px solid var(--color-grey-light);
  }
`;

export const FILTER_BUTTON_DATA = [
  { name: "Product Name" },
  { name: "Brand" },
  { name: "Active Ingredients" },
  { name: "Inactive Ingredients" },
  { name: "Allergns" },
  { name: "Product Form" },
  { name: "Dietary Requirements" },
  { name: "Adults" },
  { name: "Kids Friendly" },
  { name: "Pregnancy Friendly" },
  { name: "Brand Recommendation" },
  { name: "Country" },
];

const FilterList = (props: FilterListProps) => {
  const { selectedFilters, setSelectedFilters, clearFilters } = props;

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
              <FilterControls filterName={filter.name} />
            )}
          </>
        );
      })}
    </FilterWrapper>
  );
};

export default FilterList;
