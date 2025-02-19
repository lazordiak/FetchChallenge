import { poppins } from "@/app/utils/fonts";
import { FC } from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection: FC<FilterSectionProps> = ({ title, children }) => {
  return (
    <div
      className={`${poppins.className} flex font-semibold text-gray-800 w-full items-center flex-col gap-2`}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};
