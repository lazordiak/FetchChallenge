import { Dog } from "@/app/page";
import SimpleModal from "./SimpleModal";
import { FC } from "react";
import { motion } from "motion/react";
import { poppins, quicksand } from "@/app/utils/fonts";

interface MatchModal {
  match: string;
  dogs: Dog[];
  clearMatch: () => void;
}

export const MatchModal: FC<MatchModal> = ({ dogs, match, clearMatch }) => {
  const matchedDog = dogs.find((dog) => dog.id === match);

  if (!matchedDog) return;

  return (
    <SimpleModal isOpen={!!match}>
      <div
        className={`${poppins.className} flex flex-col items-center justify-center gap-4`}
      >
        <h1 className={`${quicksand.className} font-bold text-2xl`}>
          New Best Friend Found!
        </h1>
        <div className="w-full flex flex-col items-center justify-center relative aspect-square rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={matchedDog.img}
            alt={matchedDog.name}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">{matchedDog.name}</h1>
          <p className="text-lg">{matchedDog.breed}</p>
          <p>{matchedDog.age}</p>
          <p>{matchedDog.zip_code}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={clearMatch}
          className="border-2 bg-tigersEye text-whiteSmoke rounded-lg py-2 px-4"
        >
          Browse More Doggos
        </motion.button>
      </div>
    </SimpleModal>
  );
};
