import React from "react";
import { motion, AnimatePresence } from "framer-motion";
//import { X } from "lucide-react";
import { poppins } from "../../utils/fonts";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose = () => {},
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key={1}
            className="fixed inset-0 bg-nightBlack backdrop-blur-md bg-opacity-60 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            key={2}
            className={`fixed ${poppins.className} z-50 inset-0 flex items-center justify-center`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="bg-whiteSmoke relative text-nightBlack p-4 rounded-lg shadow-lg max-w-sm w-full">
              {/*<button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={onClose}
              >
                <X />
              </button>*/}
              <div key={"FakeKey"}>{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SimpleModal;
