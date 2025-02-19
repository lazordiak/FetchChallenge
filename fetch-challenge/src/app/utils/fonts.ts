import {
  Manrope,
  Playfair_Display,
  Poppins,
  Quicksand,
} from "next/font/google";

export const poppins = Poppins({
  style: "normal",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const playfairDisplay = Playfair_Display({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export const quicksand = Quicksand({
  style: "normal",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const manrope = Manrope({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});
