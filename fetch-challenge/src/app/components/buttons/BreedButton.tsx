import { motion } from "motion/react";
import { FC } from "react";

interface BreedButtonProps {
  breed: string;
}

export const BreedButton: FC<BreedButtonProps> = ({ breed }) => {
  return <motion.button>{breed}</motion.button>;
};
