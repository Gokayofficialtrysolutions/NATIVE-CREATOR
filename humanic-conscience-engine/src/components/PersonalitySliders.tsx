import React from 'react';
import { Agent } from '../interfaces/Agent';

interface PersonalitySlidersProps {
  selectedAgent: Agent | null;
  onPersonalityChange: (trait: keyof Agent['personality'], value: number) => void;
}

const PersonalitySliders: React.FC<PersonalitySlidersProps> = ({ selectedAgent, onPersonalityChange }) => {
  const traits: (keyof Agent['personality'])[] = ['rudeness', 'slang', 'politeness', 'curiosity', 'rationality', 'empathy'];

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Personality</h3>
      {selectedAgent ? (
        traits.map((trait) => (
          <div key={trait} className="mb-2">
            <label htmlFor={trait} className="block text-sm font-medium text-gray-700 capitalize">{trait}</label>
            <input
              type="range"
              id={trait}
              min="0"
              max="100"
              value={selectedAgent.personality[trait]}
              onChange={(e) => onPersonalityChange(trait, parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        ))
      ) : (
        <p>Select an agent to edit their personality.</p>
      )}
    </div>
  );
};

export default PersonalitySliders;
