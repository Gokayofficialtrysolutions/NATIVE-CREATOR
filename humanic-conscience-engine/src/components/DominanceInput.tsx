import React from 'react';

const DominanceInput = () => {
  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Dominance</h3>
      <div className="mb-2">
        <label htmlFor="dominance" className="block text-sm font-medium text-gray-700">Dominance (%)</label>
        <input
          type="number"
          id="dominance"
          min="0"
          max="100"
          defaultValue="50"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};

export default DominanceInput;
