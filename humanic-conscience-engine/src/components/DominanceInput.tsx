import React from 'react';
import { Agent } from '../interfaces/Agent';

interface DominanceInputProps {
  selectedAgent: Agent | null;
  onDominanceChange: (value: number) => void;
}

const DominanceInput: React.FC<DominanceInputProps> = ({ selectedAgent, onDominanceChange }) => {
  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Dominance</h3>
      {selectedAgent ? (
        <div className="mb-2">
          <label htmlFor="dominance" className="block text-sm font-medium text-gray-700">Dominance (%)</label>
          <input
            type="number"
            id="dominance"
            min="0"
            max="100"
            value={selectedAgent.dominance}
            onChange={(e) => onDominanceChange(parseInt(e.target.value, 10))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      ) : (
        <p>Select an agent to edit their dominance.</p>
      )}
    </div>
  );
};

export default DominanceInput;
