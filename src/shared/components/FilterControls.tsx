import { TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingProgress from "./LoadingProgress";
import MultiSelect, { MultiSelectOption } from "./MultiSelect";

type FilterControlsProps = {
  filterName: string;
  filterApiKey: string;
  filterOptions: any;
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
  const { filterOptions, filterName, constructApiFilters, filterApiKey } =
    props;

  const [selectedFilterValues, setSelectedFilterValues] =
    useState<Array<MultiSelectOption> | null>(null);

  const [productNameFilter, setProductNameFilter] = useState<string>();

  useEffect(() => {
    if (!selectedFilterValues) return;
    constructApiFilters(filterApiKey, selectedFilterValues);
  }, [selectedFilterValues]);

  useEffect(() => {
    constructApiFilters("name", null, productNameFilter);
  }, [productNameFilter]);

  // const filterNames = filterOptions[filterApiKey]?.map((filter: string) => {
  //   return { name: filter };
  // });

  // console.log("sd", filterNames);

  return (
    <Wrapper>
      {filterName !== "Product Name" ? (
        <MultiSelect
          options={filterOptions[filterApiKey]}
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
