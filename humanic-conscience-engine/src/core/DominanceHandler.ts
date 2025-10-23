import { Agent } from '../interfaces/Agent';

export class DominanceHandler {
  public canInterrupt(agentA: Agent, agentB: Agent): boolean {
    const dominanceDifference = agentA.dominance - agentB.dominance;
    if (dominanceDifference > 0) {
      // Add a random factor to the interruption logic
      return Math.random() < (dominanceDifference / 100);
    }
    return false;
  }
}
