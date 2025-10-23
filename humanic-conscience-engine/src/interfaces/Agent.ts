export interface Agent {
  name: string;
  role: string;
  dominance: number;
  personality: {
    rudeness: number;
    slang: number;
    politeness: number;
    curiosity: number;
    rationality: number;
    empathy: number;
  };
}
