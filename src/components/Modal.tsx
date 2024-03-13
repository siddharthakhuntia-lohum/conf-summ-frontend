import React, { useState } from "react";
import { Button } from "./ui/button";
import { FiThumbsUp } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-4 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 flex justify-center items-center">
            <FiThumbsUp className="inline-block text-green-500 mr-1" /> Congrats
            !
          </h3>
          <div className="mt-2  py-3">
            <p className=" text-gray-500">
              Your video has been submitted successfully.
            </p>
          </div>
          <div className="flex justify-end">
            <Button className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
