// Modal.tsx

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; 

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-content bg-white p-6 rounded shadow-lg z-50">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
