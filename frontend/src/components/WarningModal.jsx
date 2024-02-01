import React from "react";

const WarningModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-slate-50 opacity-20 pointer-events-none"></div>
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg pointer-events-auto">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Total Expense Exeeds Total Budget Of the Month !
        </h2>
        <button
          className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 rounded border-black"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
