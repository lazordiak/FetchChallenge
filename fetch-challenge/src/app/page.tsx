"use client";

import { useCallback, useEffect, useState } from "react";
import { LoginModal } from "./components/modals/LoginModal";
import axios from "axios";
import { Header } from "./components/Header";
import { FilterSidebar } from "./components/sidebars/FilterSidebar";
import { DogGrid } from "./components/grid/DogGrid";
import { ToggleButton } from "./components/buttons/ToggleButton";
import { MultiValue } from "react-select";
import { BeatLoader } from "react-spinners";
import { FilterSection } from "./components/sidebars/FilterSection";
import { motion } from "motion/react";
import { IntroInfo } from "./components/infoText/IntroInfo";
import { MatchModal } from "./components/modals/MatchModal";
import { BASE_URL, formatAgesForFetch } from "./utils/queries";
import { poppins, quicksand } from "./utils/fonts";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface FetchParams {
  breeds: string[];
  sort: string;
  size: number;
  zipCode?: string[];
  ageMin?: number;
  ageMax?: number;
}

export default function Home() {
  /* Login State */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  /* Filter State */
  const [filters, setFilters] = useState({
    selectedBreeds: [] as string[],
    dogAges: [] as string[],
    zipCode: "",
    inAscendingOrder: true,
  });

  /* Dog Data State */
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);

  /* Search State */
  const [searchError, setSearchError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [dogCount, setDogCount] = useState({
    currentDogCount: 0,
    totalDogCount: 0,
  });

  /* Favorited Dogs */
  const [favoritedDogs, setFavoritedDogs] = useState(new Set<Dog>());
  const [allOrFavs, setAllOrFavs] = useState<"all" | "favs">("all");
  const [match, setMatch] = useState<string | null>(null);

  const getMatch = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/dogs/match`,
        Array.from(favoritedDogs).map((dog) => dog.id),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setMatch(data.match);
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };

  const fetchDogData = useCallback(
    async (isPagination = false) => {
      if (!isPagination) {
        setFavoritedDogs(new Set<Dog>());
        setIsLoading(true);
        setAllDogs([]);
        setNextPage(null);
      }

      const fetchParams: FetchParams = {
        breeds: filters.selectedBreeds,
        sort: filters.inAscendingOrder ? "breed:asc" : "breed:desc",
        size: 24,
      };

      if (filters.dogAges.length > 0) {
        console.log("its picking it up");
        const { min, max } = formatAgesForFetch(filters.dogAges);
        fetchParams.ageMin = min;
        fetchParams.ageMax = max;
      }
      if (filters.zipCode && filters.zipCode.length === 5) {
        fetchParams.zipCode = [filters.zipCode];
      }

      try {
        let response;
        if (isPagination && nextPage) {
          response = await axios.get(BASE_URL + nextPage, {
            withCredentials: true,
          });
        } else {
          response = await axios.get(`${BASE_URL}/dogs/search`, {
            params: fetchParams,
            withCredentials: true,
          });
        }

        const { data } = response;

        const { total } = data;

        if (data.next) {
          setNextPage(data.next);
        }

        const ids = data.resultIds;

        if (ids.length > 0) {
          const { data } = await axios.post(`${BASE_URL}/dogs`, ids, {
            withCredentials: true,
          });
          setAllDogs((prevDogs) =>
            isPagination ? [...prevDogs, ...data] : data
          );

          setDogCount((prev) => ({
            currentDogCount: isPagination
              ? prev.currentDogCount + ids.length
              : ids.length,
            totalDogCount: total,
          }));
        } else {
          setAllDogs([]);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
        setSearchError("Error fetching dogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      filters.selectedBreeds,
      filters.inAscendingOrder,
      filters.dogAges,
      filters.zipCode,
      nextPage,
    ]
  );

  useEffect(() => {
    if (filters.selectedBreeds.length > 0) {
      fetchDogData(false);
    } else {
      setFavoritedDogs(new Set<Dog>());
      setAllDogs([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.selectedBreeds, filters.inAscendingOrder, filters.dogAges]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/dogs/breeds`, {
          withCredentials: true,
        });
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
        setSearchError("Error fetching breeds. Please try again later.");
      }
    };

    if (isLoggedIn) fetchBreeds();
  }, [isLoggedIn]);

  const handleOrderToggle = () => {
    setFilters((prev) => ({
      ...prev,
      inAscendingOrder: !prev.inAscendingOrder,
    }));
  };

  const handleLogin = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/login`,
        { name, email },
        { withCredentials: true }
      );
      setName("");
      setEmail("");
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBreedSelectChange = (
    selected: MultiValue<{ value: string; label: string }>
  ) => {
    setFilters((prev) => ({
      ...prev,
      selectedBreeds: selected.map((item) => item.value),
    }));
  };

  const handleAgeChange = (
    selected: MultiValue<{ value: string; label: string }>
  ) => {
    setFilters((prev) => ({
      ...prev,
      dogAges: selected.map((item) => item.value),
    }));
  };

  const handleFavoriteDogs = (dog: Dog) => {
    setFavoritedDogs((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dog)) {
        newFavorites.delete(dog);
      } else {
        newFavorites.add(dog);
      }
      return newFavorites;
    });
  };

  const calculateDogsToShow = () => {
    if (allOrFavs === "all") {
      return allDogs;
    } else {
      return allDogs.filter((dog) => favoritedDogs.has(dog));
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginModal
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        modalError=""
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      className="min-w-screen flex flex-col text-nightBlack bg-cornsilk min-h-screen"
    >
      {!!match && (
        <MatchModal
          clearMatch={() => {
            setMatch(null);
          }}
          dogs={allDogs}
          match={match}
        />
      )}
      <Header handleLogout={handleLogout} />
      <div className="w-full flex flex-col h-full flex-grow xl:flex-row">
        <div
          className={`${poppins.className} shadow-inner bg-parchment border-r-[1px] border-darkMoss p-8 flex w-full flex-col gap-12 font-bold items-center xl:max-w-xs`}
        >
          <h1 className={`${quicksand.className} font-semibold text-2xl`}>
            Filter Options
          </h1>
          {breeds && (
            <div className="flex flex-col w-full gap-12">
              <FilterSection title="Breeds">
                <FilterSidebar
                  selectedItems={filters.selectedBreeds}
                  handleSelectChange={handleBreedSelectChange}
                  items={breeds}
                />
              </FilterSection>
              <FilterSection title="Ages">
                <FilterSidebar
                  selectedItems={filters.dogAges}
                  handleSelectChange={handleAgeChange}
                  items={["Puppy", "Young", "Adult", "Senior"]}
                />
              </FilterSection>
              <FilterSection title="Zip">
                <input
                  className="px-2 shadow-md py-1 w-full border-[1px] rounded-md"
                  placeholder="ZipCode"
                ></input>
              </FilterSection>
              <FilterSection title="Sort Order By Breed">
                <ToggleButton
                  isChecked={filters.inAscendingOrder}
                  handleToggle={handleOrderToggle}
                />
              </FilterSection>
              <FilterSection title="Favorites">
                <div className="font-normal">
                  You&apos;ve favorited{" "}
                  <span className="font-bold">{favoritedDogs.size}</span> dogs!
                </div>

                <div className="flex flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="border-2 bg-tigersEye text-whiteSmoke py-2 px-4 rounded-lg"
                    onClick={() => {
                      setFavoritedDogs(new Set<Dog>());
                    }}
                  >
                    Clear Favorites
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    disabled={favoritedDogs.size === 0}
                    onClick={getMatch}
                    className="border-2 bg-tigersEye text-whiteSmoke py-2 px-4 rounded-lg"
                  >
                    Get Match!
                  </motion.button>
                </div>
              </FilterSection>
            </div>
          )}
        </div>
        <div
          key={"1"}
          className="flex w-full xl:mt-0 xl:w-full items-center flex-col"
        >
          {allDogs.length === 0 && !isLoading && <IntroInfo />}

          {isLoading && (
            <div key="Loader" className="flex mt-12 justify-center">
              <BeatLoader color="#283618" />
            </div>
          )}

          {allDogs.length > 0 && (
            <DogGrid
              allOrFavs={allOrFavs}
              setAllOrFavs={setAllOrFavs}
              isLoading={isLoading}
              favoritedDogs={favoritedDogs}
              dogCount={dogCount}
              nextPage={nextPage}
              dogs={calculateDogsToShow()}
              handleFavoriteDog={handleFavoriteDogs}
              fetchMore={fetchDogData}
            />
          )}
          {searchError && <div>{searchError}</div>}
        </div>
      </div>
    </motion.div>
  );
}
