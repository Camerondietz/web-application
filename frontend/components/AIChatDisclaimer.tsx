import { useState, useEffect } from "react";

const AIChatDisclaimer = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <p className="mb-4">
          The AI tool provides suggestions based on the data it processes.
          Please verify all information before taking action based on these suggestions. The content generated is
          not guaranteed to be accurate and should be used with discretion.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AIChatDisclaimer;
