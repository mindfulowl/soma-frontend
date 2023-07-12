import { TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import MultiSelect, { MultiSelectOption } from "./MultiSelect";

export type FilterOptions = {
  adult?: Array<MultiSelectOption>;
  activeIngredients?: Array<MultiSelectOption>;
  allergens?: Array<MultiSelectOption>;
  brands?: Array<MultiSelectOption>;
  capsuleIngredients?: Array<MultiSelectOption>;
  countries?: Array<MultiSelectOption>;
  kids?: Array<MultiSelectOption>;
  pregnancyFriendlyFlags?: Array<MultiSelectOption>;
  dietaryRequirements?: Array<MultiSelectOption>;
  healthConcerns?: Array<MultiSelectOption>;
  inactiveIngredients?: Array<MultiSelectOption>;
  productForms?: Array<MultiSelectOption>;
};

type FilterControlsProps = {
  filterName: string;
  filterApiKey: string;
  filterOptions: FilterOptions;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterValues, filterApiKey]);

  useEffect(() => {
    constructApiFilters("name", null, productNameFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productNameFilter, filterApiKey]);

  return (
    <Wrapper>
      {filterName !== "Product Name" && filterName === "Adult" ? (
        <MultiSelect
          options={[{ name: "True" }, { name: "False" }]}
          required={false}
          currentValue={null}
          handleChange={setSelectedFilterValues}
          label={filterName}
        />
      ) : filterName !== "Product Name" && filterName !== "Adult" ? (
        <MultiSelect
          options={filterOptions[filterApiKey as keyof FilterOptions]}
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
