import React, { FC } from "react";
import Select, { MultiValue } from "react-select";

interface FilterSidebarProps {
  handleSelectChange: (
    selected: MultiValue<{ value: string; label: string }>
  ) => void;
  items: string[];
  selectedItems: string[];
}

export const FilterSidebar: FC<FilterSidebarProps> = ({
  handleSelectChange,
  items,
  selectedItems,
}) => {
  const mappedOptions = items.map((item) => {
    return { value: item, label: item };
  });

  const mappedValues = selectedItems.map((item) => {
    return { value: item, label: item };
  });

  return (
    <Select
      value={mappedValues}
      className="w-full bg-whiteSmoke shadow-md"
      isMulti
      onChange={handleSelectChange}
      options={mappedOptions}
    />
  );
};
