import { TurnController } from '../src/core/TurnController';
import { Agent } from '../src/interfaces/Agent';

describe('TurnController', () => {
  it('should return agents in order of dominance', () => {
    const agent1: Agent = { name: 'Agent 1', dominance: 50, role: 'Tester', mood: 'neutral', personality: {} as any };
    const agent2: Agent = { name: 'Agent 2', dominance: 100, role: 'Tester', mood: 'neutral', personality: {} as any };
    const agent3: Agent = { name: 'Agent 3', dominance: 0, role: 'Tester', mood: 'neutral', personality: {} as any };
    const turnController = new TurnController([agent1, agent2, agent3]);

    expect(turnController.getPrimarySpeaker()).toEqual(agent2);
    expect(turnController.getPrimarySpeaker()).toEqual(agent1);
    expect(turnController.getPrimarySpeaker()).toEqual(agent3);
    expect(turnController.getPrimarySpeaker()).toEqual(agent2);
  });
});
