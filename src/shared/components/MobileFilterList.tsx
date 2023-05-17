import { SwipeableDrawer } from "@mui/material";
import { MultiSelectOption } from "./MultiSelect";
import FilterList, { FilterButtonData } from "./FilterList";
import { FILTER_BUTTON_DATA } from "../../routes/products/ProductsPage";

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
  filterButtons: Array<FilterButtonData>;
  clearFilters: () => void;
  constructApiFilters: (
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
    constructApiFilters,
    filterButtons,
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
        constructApiFilters={constructApiFilters}
        filterButtons={filterButtons}
      />
    </SwipeableDrawer>
  );
};

export default MobileFilterList;
