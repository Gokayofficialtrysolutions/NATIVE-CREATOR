import { Agent } from '../interfaces/Agent';
import { DominanceHandler } from './DominanceHandler';

export class TurnController {
  private agents: Agent[];
  private dominanceHandler: DominanceHandler;
  private primarySpeakerIndex: number;

  constructor(agents: Agent[]) {
    this.agents = [...agents].sort((a, b) => b.dominance - a.dominance);
    this.dominanceHandler = new DominanceHandler();
    this.primarySpeakerIndex = 0;
  }

  public getPrimarySpeaker(): Agent {
    if (this.agents.length === 0) {
      throw new Error('No agents available to speak.');
    }

    const speaker = this.agents[this.primarySpeakerIndex];
    this.primarySpeakerIndex = (this.primarySpeakerIndex + 1) % this.agents.length;
    return speaker;
  }

  public checkForInterruptions(currentSpeaker: Agent): Agent | null {
    if (this.agents.length < 2) {
      return null;
    }

    // Sort agents by dominance to find the most likely interrupter first
    const potentialInterrupters = [...this.agents].sort((a, b) => b.dominance - a.dominance);

    for (const interrupter of potentialInterrupters) {
      if (this.dominanceHandler.canInterrupt(interrupter, currentSpeaker)) {
        return interrupter;
      }
    }

    return null;
  }
}
