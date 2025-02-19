import { Dog } from "@/app/page";
import { manrope, quicksand } from "@/app/utils/fonts";
import { Dot, Heart } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";

interface DogCardProps {
  dog: Dog;
  index: number;
  handleFavoriteDog: (dog: Dog) => void;
  isFavorited: boolean;
}

export const DogCard: FC<DogCardProps> = ({
  dog,
  index,
  handleFavoriteDog,
  isFavorited,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 25 }}
      animate={{
        opacity: 1,
        translateY: 0,
        border: isFavorited ? "4px solid #BC6C25" : "1px solid #606C38",
        transition: {
          default: { delay: (index % 24) * 0.1 },
          border: { duration: 0.2 },
        },
      }}
      className="max-w-sm w-full rounded-lg shadow-lg flex flex-col items-center"
    >
      <div className="w-full relative aspect-square rounded-md overflow-hidden">
        <motion.div
          initial={{
            opacity: 0.6,
            color: "#000000",
          }}
          animate={{
            opacity: isFavorited ? 1 : 0.6,
            color: isFavorited ? "#ff0000" : "#000000",
          }}
          whileHover={{
            opacity: isFavorited ? 1 : 0.9,
            scale: 1.1,
            color: "#ff0000",
            backgroundColor: "#ffffff",
          }}
          onClick={() => {
            handleFavoriteDog(dog);
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full"
        >
          <Heart strokeWidth={3} />
        </motion.div>
        <img
          className="w-full h-full object-cover"
          src={dog.img}
          alt={dog.name}
        />
      </div>
      <div
        className={`${manrope.className} flex flex-col items-center justify-center p-2`}
      >
        <h1 className={`${quicksand.className} font-bold text-xl`}>
          {dog.name}
        </h1>
        <p className="text-gray-800 flex flex-row">
          {dog.breed} <Dot /> {dog.age} yrs
        </p>
        <p className="text-gray-800">At {dog.zip_code}</p>
      </div>
    </motion.div>
  );
};
