import { SwipeableDrawer } from "@mui/material";
import { MultiSelectOption } from "../../../shared/components/MultiSelect";
import FilterList from "./FilterList";

export enum AnchorPositionEnum {
  OPEN_TOP = "top",
  OPEN_LEFT = "left",
  OPEN_RIGHT = "right",
  OPEN_BOTTOM = "bottom",
}

type MobileFilterListProps = {
  setSelectedFilters: (selectedFilter: string) => void;
  selectedFilters: Array<string> | null;
  isOpen: boolean;
  setIsOpen: () => void;
  anchorPosition: AnchorPositionEnum;
  clearFilters: () => void;
  constructApiFilterString: (
    filterName: string,
    values: Array<MultiSelectOption> | null,
    productNameFilter?: string
  ) => void;
};

const MobileFilterList = (props: MobileFilterListProps) => {
  const {
    selectedFilters,
    setSelectedFilters,
    isOpen,
    anchorPosition,
    setIsOpen,
    clearFilters,
    constructApiFilterString,
  } = props;

  return (
    <SwipeableDrawer
      anchor={anchorPosition}
      open={isOpen}
      onClose={setIsOpen}
      onOpen={setIsOpen}
    >
      <FilterList
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        clearFilters={clearFilters}
        constructApiFilterString={constructApiFilterString}
      />
    </SwipeableDrawer>
  );
};

export default MobileFilterList;
