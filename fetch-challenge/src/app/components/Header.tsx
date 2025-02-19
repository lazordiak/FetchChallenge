import { FC } from "react";
import { poppins, quicksand } from "../utils/fonts";
import { motion } from "motion/react";

interface HeaderProps {
  handleLogout: () => void;
}

export const Header: FC<HeaderProps> = ({ handleLogout }) => {
  return (
    <header className="flex text-whiteSmoke flex-row bg-darkMoss justify-between items-center p-4 h-12">
      <div className={`${quicksand.className} font-semibold text-3xl`}>
        Doggo&apos;s Delight
      </div>
      <motion.button
        whileHover={{ color: "#DDA15E" }}
        className={`${poppins.className} rounded-md border-whiteSmoke-2`}
        onClick={handleLogout}
      >
        Logout
      </motion.button>
    </header>
  );
};
