import { Agent } from '../interfaces/Agent';

export class AgentManager {
  private agents: Agent[] = [];

  public addAgent(agent: Agent): void {
    this.agents.push(agent);
  }

  public getAgent(name: string): Agent | undefined {
    return this.agents.find(agent => agent.name === name);
  }

  public getAllAgents(): Agent[] {
    return this.agents;
  }
}
