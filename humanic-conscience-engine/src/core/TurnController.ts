import { Agent } from '../interfaces/Agent';

export class TurnController {
  private agents: Agent[];
  private currentIndex: number;

  constructor(agents: Agent[]) {
    this.agents = [...agents].sort((a, b) => b.dominance - a.dominance);
    this.currentIndex = 0;
  }

  public getNextSpeaker(): Agent {
    if (this.agents.length === 0) {
      throw new Error('No agents available to speak.');
    }

    const speaker = this.agents[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.agents.length;
    return speaker;
  }
}
