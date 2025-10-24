import React from 'react';
import { Agent } from '../interfaces/Agent';

interface EmotionIndicatorProps {
  selectedAgent: Agent | null;
}

const EmotionIndicator: React.FC<EmotionIndicatorProps> = ({ selectedAgent }) => {
  const getMoodEmoji = () => {
    if (!selectedAgent) return '😐';
    switch (selectedAgent.mood) {
      case 'happy':
        return '😄';
      case 'angry':
        return '😠';
      case 'curious':
        return '🤔';
      default:
        return '😐';
    }
  };

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Emotion</h3>
      {selectedAgent ? (
        <div className="text-center">
          <span className="text-4xl">{getMoodEmoji()}</span>
          <p className="text-lg capitalize">{selectedAgent.mood}</p>
        </div>
      ) : (
        <p>Select an agent to see their emotion.</p>
      )}
    </div>
  );
};

export default EmotionIndicator;
