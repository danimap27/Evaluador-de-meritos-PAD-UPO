import React from 'react';

interface CongratulationsPopupProps {
  message: string;
  onClose: () => void;
}

const CongratulationsPopup: React.FC<CongratulationsPopupProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--background-color)] text-[var(--text-color)] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-[var(--primary-color)]">
        <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-4">¡Enhorabuena!</h2>
        <p className="text-lg mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:brightness-90 transition-all duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CongratulationsPopup;
