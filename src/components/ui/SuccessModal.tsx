import React, { useEffect, useState } from "react";

const SuccessModal = ({ isOpen, onClose, onConfirm }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      // Delay removal until animation completes
      const timeout = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose} // clicking outside modal closes it
      className={`fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={handleModalClick}
        className={`bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative transform transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-8"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-green-600 mb-4">
          NFT minted successfully!
        </h2>

        {/* Body with Icon */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/success-icon.png"
            alt="Success"
            className="w-16 h-16 mx-auto mb-4 animate-fade-in"
          />
        </div>

        {/* Uncomment footer if needed */}
        {/* <div className="mt-6 text-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Go to My NFTs
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SuccessModal;
