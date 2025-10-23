import React, { useState } from 'react';

interface AgentCreatorProps {
  onAddAgent: (name: string, role: string) => void;
}

const AgentCreator: React.FC<AgentCreatorProps> = ({ onAddAgent }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Scientist');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddAgent(name, role);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Create Agent</h3>
      <div className="mb-2">
        <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="agentName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="agentRole" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="agentRole"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option>Scientist</option>
          <option>Philosopher</option>
          <option>AI</option>
          <option>Animal</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Agent
      </button>
    </form>
  );
};

export default AgentCreator;
