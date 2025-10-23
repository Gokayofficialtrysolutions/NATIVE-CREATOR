import { Agent } from '../interfaces/Agent';

export class PersonalitySimulator {
  public generateResponse(agent: Agent, inputText: string): string {
    let response = `As a ${agent.role}, I think about "${inputText}".`;

    if (agent.personality.rudeness > 70) {
      response += " Whatever that means.";
    }
    if (agent.personality.slang > 70) {
      response += " You know what I'm sayin'?";
    }
    if (agent.personality.politeness > 70) {
      response += " Thank you for your question.";
    }
    if (agent.personality.curiosity > 70) {
      response += " That's a fascinating topic.";
    }
    if (agent.personality.rationality > 70) {
      response += " Let's think about this logically.";
    }
    if (agent.personality.empathy > 70) {
      response += " I understand how you might feel about that.";
    }

    return response;
  }
}
