import { Dog } from "@/app/page";
import { FC } from "react";
import { DogCard } from "../cards/DogCard";
import { quicksand } from "@/app/utils/fonts";
import { motion } from "motion/react";

interface DogGridProps {
  dogs: Dog[];
  nextPage: string | null;
  dogCount: {
    currentDogCount: number;
    totalDogCount: number;
  };
  isLoading: boolean;
  fetchMore: (pagination: boolean) => void;
  handleFavoriteDog: (dog: Dog) => void;
  favoritedDogs: Set<Dog>;
  allOrFavs: "all" | "favs";
  setAllOrFavs: (allOrFavs: "all" | "favs") => void;
}

export const DogGrid: FC<DogGridProps> = ({
  allOrFavs,
  setAllOrFavs,
  dogCount,
  dogs,
  nextPage,
  isLoading,
  fetchMore,
  handleFavoriteDog,
  favoritedDogs,
}) => {
  const totalDogCount =
    allOrFavs === "all" ? dogCount.totalDogCount : dogs.length;
  const currentDogCount =
    allOrFavs === "all" ? dogCount.currentDogCount : dogs.length;
  return (
    <div className="flex flex-col w-full p-8 gap-8">
      <div
        className={`${quicksand.className} w-full flex-row gap-8 flex justify-center`}
      >
        <motion.button
          whileHover={{ color: "#BC6C25" }}
          onClick={() => setAllOrFavs("all")}
          className={`${
            allOrFavs === "all" ? "underline" : ""
          } font-semibold text-3xl`}
        >
          Show All Dogs
        </motion.button>
        <motion.button
          whileHover={{ color: "#BC6C25" }}
          onClick={() => setAllOrFavs("favs")}
          className={`${
            allOrFavs === "favs" ? "underline" : ""
          } font-semibold text-3xl`}
        >
          Show Only Favorites
        </motion.button>
      </div>
      <div className="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dogs.map((dog, index) => {
          return (
            <DogCard
              handleFavoriteDog={handleFavoriteDog}
              isFavorited={favoritedDogs.has(dog)}
              index={index}
              key={dog.id}
              dog={dog}
            />
          );
        })}
      </div>
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <p className="">
          Showing <span className="font-semibold">{currentDogCount}</span> of{" "}
          <span className="font-semibold">{totalDogCount}</span> doggos
        </p>
        {nextPage && !isLoading && allOrFavs !== "favs" && (
          <button
            onClick={() => fetchMore(true)}
            className="border-2 p-4 text-semibold text-2xl rounded-lg"
          >
            Fetch more! 🐶
          </button>
        )}
      </div>
    </div>
  );
};
