import { ChevronDown, ChevronUp } from "lucide-react";
import React, { FC } from "react";

interface ToggleButtonProps {
  isChecked: boolean;
  handleToggle: () => void;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  isChecked,
  handleToggle,
}) => {
  return (
    <>
      <label className="relative shadow-md w-full inline-flex cursor-pointer select-none items-center justify-center rounded-md">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span
          className={`flex font-semibold w-full items-center rounded py-2 text-sm ${
            isChecked ? "text-whiteSmoke bg-[#BC6C25]" : "text-body-color"
          }`}
        >
          <ChevronUp />
          Ascending
        </span>
        <span
          className={`flex font-semibold w-full items-center rounded py-2 text-sm ${
            !isChecked ? "text-whiteSmoke bg-[#BC6C25]" : "text-body-color"
          }`}
        >
          <ChevronDown />
          Descending
        </span>
      </label>
    </>
  );
};
