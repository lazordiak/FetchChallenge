import { FC } from "react";

interface HeaderProps {
  handleLogout: () => void;
}

export const Header: FC<HeaderProps> = ({ handleLogout }) => {
  return (
    <header className="flex text-whiteSmoke flex-row bg-nightBlack justify-between items-center p-4 h-12">
      <div className="text-2xl">Doggo&apos;s Delight</div>
      <div className="">
        <button
          className="rounded-md border-whiteSmoke-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};
