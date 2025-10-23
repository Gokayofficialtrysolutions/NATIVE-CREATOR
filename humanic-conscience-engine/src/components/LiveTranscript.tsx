import React from 'react';

interface LiveTranscriptProps {
  conversation: {
    timestamp: number;
    speaker: string;
    text: string;
  }[];
}

const LiveTranscript: React.FC<LiveTranscriptProps> = ({ conversation }) => {
  return (
    <div className="p-4 border rounded-lg h-96 overflow-y-auto">
      <h3 className="text-lg font-bold mb-2">Live Transcript</h3>
      <ul>
        {conversation.map((message) => (
          <li key={message.timestamp}>
            <strong>{message.speaker}:</strong> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveTranscript;
