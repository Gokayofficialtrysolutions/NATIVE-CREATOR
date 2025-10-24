import React from 'react';

interface SpeechSpeedSliderProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeechSpeedSlider: React.FC<SpeechSpeedSliderProps> = ({ speed, onSpeedChange }) => {
  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Speech Speed</h3>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default SpeechSpeedSlider;
