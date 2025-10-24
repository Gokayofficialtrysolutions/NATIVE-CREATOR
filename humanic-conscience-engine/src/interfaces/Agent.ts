export type Mood = 'neutral' | 'happy' | 'angry' | 'curious';

export interface Agent {
  name: string;
  role: string;
  dominance: number;
  mood: Mood;
  personality: {
    rudeness: number;
    slang: number;
    politeness: number;
    curiosity: number;
    rationality: number;
    empathy: number;
  };
}
