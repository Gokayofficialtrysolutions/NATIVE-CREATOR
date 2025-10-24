import { Agent, Mood } from '../interfaces/Agent';

export class MoodShiftSystem {
  public analyseAndShift(agent: Agent, text: string): Mood {
    const lowerCaseText = text.toLowerCase();

    // Simple keyword-based mood analysis
    if (lowerCaseText.includes('?')) {
      return 'curious';
    } else if (lowerCaseText.includes('happy') || lowerCaseText.includes('great') || lowerCaseText.includes('wonderful')) {
      return 'happy';
    } else if (lowerCaseText.includes('angry') || lowerCaseText.includes('hate') || lowerCaseText.includes('terrible')) {
      return 'angry';
    }

    // Default to neutral if no strong indicators are found
    return 'neutral';
  }
}
