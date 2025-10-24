import { GoogleGenerativeAI } from '@google/generative-ai';
import { Agent } from '../interfaces/Agent';

// ====================================================================================
// IMPORTANT: API KEY MANAGEMENT
// ====================================================================================
// Do not store the API key directly in the code in a production application.
// This is a major security risk.
//
// For development, you can use an environment variable or a local configuration file.
// For production, use a secure key management service.
// ====================================================================================
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key for local development

if (API_KEY === 'YOUR_API_KEY_HERE') {
  alert('Please replace "YOUR_API_KEY_HERE" with your actual Gemini API key in AIManager.ts');
}


export class AIManager {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
  }

  public async generateResponse(agent: Agent, conversationHistory: any[]): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are an AI simulating a conscious entity. Your name is ${agent.name}, and your role is a ${agent.role}.
      Your personality is defined by the following traits (on a scale of 0-100):
      - Rudeness: ${agent.personality.rudeness}
      - Slang: ${agent.personality.slang}
      - Politeness: ${agent.personality.politeness}
      - Curiosity: ${agent.personality.curiosity}
      - Rationality: ${agent.personality.rationality}
      - Empathy: ${agent.personality.empathy}

      The conversation so far:
      ${conversationHistory.map((msg) => `${msg.speaker}: ${msg.text}`).join('\n')}

      Your task is to provide a response in character. Your response should be a single paragraph.
      IMPORTANT: You must strictly adhere to British English spelling, grammar, and idioms. For example, use "colour" instead of "color", and "lift" instead of "elevator".
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response from Gemini API:', error);
      return 'I am unable to respond at this time.';
    }
  }
}
