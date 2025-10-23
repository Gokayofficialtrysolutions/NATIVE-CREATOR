import React, { useState, useMemo, useEffect } from 'react';
import { Agent } from './interfaces/Agent';
import { AgentManager } from './core/AgentManager';
import { AudioManager } from './core/AudioManager';
import { MemoryManager } from './core/MemoryManager';
import { AIManager } from './core/AIManager';
import AgentCreator from './components/AgentCreator';
import PersonalitySliders from './components/PersonalitySliders';
import DominanceInput from './components/DominanceInput';
import LiveTranscript from './components/LiveTranscript';
import SpeakerIndicator from './components/SpeakerIndicator';

function App() {
  const agentManager = useMemo(() => new AgentManager(), []);
  const audioManager = useMemo(() => new AudioManager(), []);
  const memoryManager = useMemo(() => new MemoryManager(), []);
  const aiManager = useMemo(() => new AIManager(), []);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [conversation, setConversation] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const savedAgents = await memoryManager.getAgents();
      savedAgents.forEach(agent => agentManager.addAgent(agent));
      setAgents(savedAgents);
      if (savedAgents.length > 0) {
        setSelectedAgent(savedAgents[0]);
      }

      const savedConversation = await memoryManager.getConversation();
      setConversation(savedConversation);
    };
    loadData();
  }, [memoryManager, agentManager]);

  const handleAddAgent = async (name: string, role: string) => {
    const newAgent: Agent = {
      name,
      role,
      dominance: 50,
      personality: {
        rudeness: 50,
        slang: 50,
        politeness: 50,
        curiosity: 50,
        rationality: 50,
        empathy: 50,
      },
    };
    agentManager.addAgent(newAgent);
    await memoryManager.saveAgent(newAgent);
    setAgents([...agentManager.getAllAgents()]);
    if (!selectedAgent) {
      setSelectedAgent(newAgent);
    }
  };

  const handleSpeak = (text: string) => {
    audioManager.speak(text);
  };

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      await memoryManager.saveMessage('User', message);
      let updatedConversation = await memoryManager.getConversation();

      // Agent response
      if (agents.length > 0) {
        const respondingAgent = agents[Math.floor(Math.random() * agents.length)];
        const response = await aiManager.generateResponse(respondingAgent, updatedConversation);
        await memoryManager.saveMessage(respondingAgent.name, response);
        updatedConversation = await memoryManager.getConversation();
        handleSpeak(response);
      }

      setConversation(updatedConversation);
      setMessage('');
      setIsLoading(false);
    }
  };

  const handlePersonalityChange = async (trait: keyof Agent['personality'], value: number) => {
    if (selectedAgent) {
      const updatedAgent = {
        ...selectedAgent,
        personality: {
          ...selectedAgent.personality,
          [trait]: value,
        },
      };
      setSelectedAgent(updatedAgent);
      // This is a bit of a hack, but since we're using the agent name as a key,
      // adding the agent again will just overwrite the old one.
      agentManager.addAgent(updatedAgent);
      await memoryManager.saveAgent(updatedAgent);
      setAgents([...agentManager.getAllAgents()]);
    }
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
            <div>
              <h3 className="text-lg font-bold mb-2">Agents</h3>
              <ul className="p-4 border rounded-lg">
                {agents.map((agent) => (
                  <li
                    key={agent.name}
                    className={`cursor-pointer p-2 rounded-md ${selectedAgent?.name === agent.name ? 'bg-indigo-100' : ''}`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    {agent.name} ({agent.role})
                  </li>
                ))}
              </ul>
            </div>
            <PersonalitySliders selectedAgent={selectedAgent} onPersonalityChange={handlePersonalityChange} />
            <DominanceInput />
          </div>

          {/* Right Column: Conversation View */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Conversation View</h2>
            <LiveTranscript conversation={conversation} />
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled={isLoading}
              />
              <button onClick={handleSendMessage} className="bg-green-500 text-white py-2 px-4 rounded-r-md hover:bg-green-600" disabled={isLoading}>
                {isLoading ? 'Thinking...' : 'Send'}
              </button>
            </div>
            <SpeakerIndicator />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
