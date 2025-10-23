import React from 'react';

const PersonalitySliders = () => {
  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Personality</h3>
      {['Rudeness', 'Slang', 'Politeness', 'Curiosity', 'Rationality', 'Empathy'].map((trait) => (
        <div key={trait} className="mb-2">
          <label htmlFor={trait} className="block text-sm font-medium text-gray-700">{trait}</label>
          <input
            type="range"
            id={trait}
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalitySliders;
