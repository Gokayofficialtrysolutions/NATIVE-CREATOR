import React, { useState, useMemo } from 'react';
import { Agent } from './interfaces/Agent';
import { AgentManager } from './core/AgentManager';
import AgentCreator from './components/AgentCreator';
import PersonalitySliders from './components/PersonalitySliders';
import DominanceInput from './components/DominanceInput';
import LiveTranscript from './components/LiveTranscript';
import SpeakerIndicator from './components/SpeakerIndicator';

function App() {
  const agentManager = useMemo(() => new AgentManager(), []);
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleAddAgent = (name: string, role: string) => {
    const newAgent: Agent = {
      name,
      role,
      dominance: 50, // Default dominance
    };
    agentManager.addAgent(newAgent);
    setAgents([...agentManager.getAllAgents()]);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Humanic Conscience Engine
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Configurator */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">User Configurator</h2>
            <AgentCreator onAddAgent={handleAddAgent} />
            <PersonalitySliders />
            <DominanceInput />
            <div>
              <h3 className="text-lg font-bold mb-2">Agents</h3>
              <ul className="p-4 border rounded-lg">
                {agents.map((agent, index) => (
                  <li key={index} className="text-gray-700">{agent.name} ({agent.role})</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Conversation View */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Conversation View</h2>
            <LiveTranscript />
            <SpeakerIndicator />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
