import { Button } from "@mui/material";
import styled from "styled-components";
import { MultiSelectOption } from "./MultiSelect";
import { screenMdMin } from "../styles";
import FilterControls from "./FilterControls";

export type FilterButtonData = {
  name: string;
  apiKey: string;
};

type StyledButtonFilterProps = {
  active: boolean | undefined;
};

type FilterListProps = {
  setSelectedFilters: (selectedFilter: string) => void;
  selectedFilters: Array<string> | null;
  clearFilters: () => void;
  filterButtons: Array<FilterButtonData>;
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
    filterButtons,
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
      {filterButtons.map((filter: FilterButtonData) => {
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
