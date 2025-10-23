import { AgentManager } from './core/AgentManager';
import { DominanceHandler } from './core/DominanceHandler';
import { Agent } from './interfaces/Agent';

const agentManager = new AgentManager();
const dominanceHandler = new DominanceHandler();

const agent1: Agent = { name: 'Alice', role: 'Scientist', dominance: 70 };
const agent2: Agent = { name: 'Bob', role: 'Philosopher', dominance: 50 };

agentManager.addAgent(agent1);
agentManager.addAgent(agent2);

console.log('Agents:', agentManager.getAllAgents());

const canInterrupt = dominanceHandler.canInterrupt(agent1, agent2);
console.log(`${agent1.name} can interrupt ${agent2.name}: ${canInterrupt}`);
