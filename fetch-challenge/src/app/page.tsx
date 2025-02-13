"use client";

import { useState } from "react";
import { LoginModal } from "./components/modals/LoginModal";
import axios from "axios";
import { BASE_URL } from "./utils/fonts";
import { Header } from "./components/Header";
import { BreedButton } from "./components/buttons/BreedButton";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState<string[]>([]);

  const fetchBreeds = async () => {
    const response = await axios.get(`${BASE_URL}/dogs/breeds`, {
      withCredentials: true,
    });
    console.log("response to breeds fetch", response);
    setBreeds(response.data);
  };

  const handleLogin = async () => {
    /*const reqConfig = {
      url: `${BASE_URL}/auth/login`,
      data: {
        name,
        email,
      },
    };*/
    try {
      //await axios.post(reqConfig.url, reqConfig.data);
      await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ name, email }),
        //headers: { "Content-Type": "application/json" },
      });
      setIsLoggedIn(true);
      //await fetchBreeds();
    } catch (error) {
      await fetchBreeds();
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    console.log(response);
    setIsLoggedIn(false);
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
    <div className="min-w-screen min-h-screen">
      <Header handleLogout={handleLogout} />
      <h1 className="text-center text-2xl font-bold">
        Welcome to Doggo&apos;s Delight
      </h1>
      <div className="flex justify-center">
        {breeds &&
          breeds.map((breed) => {
            return <BreedButton key={breed} breed={breed} />;
          })}
      </div>
    </div>
  );
}
