import React from 'react';

interface AccentSelectorProps {
  selectedAccent: string;
  onAccentChange: (accent: string) => void;
}

const AccentSelector: React.FC<AccentSelectorProps> = ({ selectedAccent, onAccentChange }) => {
  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Accent</h3>
      <select
        value={selectedAccent}
        onChange={(e) => onAccentChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="en-GB">British English</option>
        <option value="en-US">American English</option>
        <option value="en-AU">Australian English</option>
      </select>
    </div>
  );
};

export default AccentSelector;
