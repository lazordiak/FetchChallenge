import { FC } from "react";
import SimpleModal from "./SimpleModal";

interface LoginModalProps {
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (password: string) => void;
  modalError: string;
  handleLogin: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
  email,
  setEmail,
  name,
  setName,
  modalError,
  handleLogin,
}) => {
  return (
    <SimpleModal isOpen={true}>
      <div className="flex flex-col gap-4">
        <h1 className="w-full text-center text-2xl font-bold">
          Login To Doggo&apos;s Delight
        </h1>
        <div>
          <p className="text-sm">Email:</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full text-nightBlack"
          ></input>
        </div>
        <div>
          <p className="text-sm">Name:</p>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 w-full text-black"
          ></input>
        </div>
        {modalError && (
          <p className="text-red-500 w-full text-center">{modalError}</p>
        )}
        <div className="flex w-full justify-center">
          <button
            onClick={handleLogin}
            className="w-1/2 bg-nightBlack text-whiteSmoke p-2 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};
