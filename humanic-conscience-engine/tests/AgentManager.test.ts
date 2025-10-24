import { AgentManager } from '../src/core/AgentManager';
import { Agent } from '../src/interfaces/Agent';

describe('AgentManager', () => {
  it('should add and get an agent', () => {
    const agentManager = new AgentManager();
    const agent: Agent = {
      name: 'Test Agent',
      role: 'Tester',
      dominance: 50,
      mood: 'neutral',
      personality: {
        rudeness: 50,
        slang: 50,
        politeness: 50,
        curiosity: 50,
        rationality: 50,
        empathy: 50,
      },
    };
    agentManager.addAgent(agent);
    expect(agentManager.getAgent('Test Agent')).toEqual(agent);
  });
});
