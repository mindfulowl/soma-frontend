import { useState } from "react";
import styled from "styled-components";
import MultiSelect, {
  MultiSelectOption,
} from "../../../shared/components/MultiSelect";

type FilterControlsProps = {
  filterName: string;
};

const Wrapper = styled.div`
  padding: var(--spacing-md) 0;
`;

const FilterControls = (props: FilterControlsProps) => {
  const { filterName } = props;

  const [practitionerHealthConcerns, setpractitionerHealthConcerns] =
    useState<Array<MultiSelectOption> | null>(null);

  return (
    <Wrapper>
      <MultiSelect
        options={top100Films}
        required={false}
        currentValue={null}
        handleChange={setpractitionerHealthConcerns}
        label={filterName}
      />
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
