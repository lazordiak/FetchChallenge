"use client";

import { useEffect, useState } from "react";
import { LoginModal } from "./components/modals/LoginModal";
import axios from "axios";
import { BASE_URL } from "./utils/fonts";
import { Header } from "./components/Header";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dogs, setDogs] = useState([]);

  const fetchAllDogs = async () => {
    const response = await axios.get(`${BASE_URL}/dogs/search`, {
      withCredentials: true,
    });
    console.log(response);
  };

  const handleLogin = async () => {
    const reqConfig = {
      url: `${BASE_URL}/auth/login`,
      data: {
        name,
        email,
      },
    };
    try {
      await axios.post(reqConfig.url, reqConfig.data);
      setIsLoggedIn(true);
      await fetchAllDogs();
    } catch (error) {
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
      <div className="flex justify-center"></div>
    </div>
  );
}
