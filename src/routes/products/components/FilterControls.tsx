import { TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import MultiSelect, {
  MultiSelectOption,
} from "../../../shared/components/MultiSelect";

type FilterControlsProps = {
  filterName: string;
  filterQueryStringName: string;
  constructApiFilters: (
    filterName: string,
    values: Array<MultiSelectOption> | null,
    productNameFilter?: string
  ) => void;
};

const Wrapper = styled.div`
  padding: var(--spacing-md) 0;
`;

const FilterControls = (props: FilterControlsProps) => {
  const { filterName, constructApiFilters, filterQueryStringName } = props;

  const [selectedFilterValues, setSelectedFilterValues] =
    useState<Array<MultiSelectOption> | null>(null);

  const [productNameFilter, setProductNameFilter] = useState<string>();

  useEffect(() => {
    if (!selectedFilterValues) return;
    constructApiFilters(filterQueryStringName, selectedFilterValues);
  }, [selectedFilterValues]);

  useEffect(() => {
    constructApiFilters("name", null, productNameFilter);
  }, [productNameFilter]);

  return (
    <Wrapper>
      {filterName !== "Product Name" ? (
        <MultiSelect
          options={top100Films}
          required={false}
          currentValue={null}
          handleChange={setSelectedFilterValues}
          label={filterName}
        />
      ) : (
        <TextField
          fullWidth
          type="search"
          label={filterName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProductNameFilter(e.target.value)
          }
        />
      )}
    </Wrapper>
  );
};

export default FilterControls;

const top100Films = [
  { name: "Vitamin C" },
  { name: "Herblore" },
  { name: "Snapdragon" },
  { name: "Oak Leaf" },
  { name: "Acorns" },
  { name: "Lactobacillius" },
  { name: "Salivarius" },
];
