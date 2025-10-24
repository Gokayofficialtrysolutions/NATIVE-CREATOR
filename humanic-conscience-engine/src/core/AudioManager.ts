export class AudioManager {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[];
  private selectedAccent: string = 'en-GB';
  private speechSpeed: number = 1;

  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.synth.onvoiceschanged = () => {
      this.voices = this.synth.getVoices();
    };
  }

  public setAccent(accent: string) {
    this.selectedAccent = accent;
  }

  public setSpeed(speed: number) {
    this.speechSpeed = speed;
  }

  public speak(text: string) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.voices.find(v => v.lang === this.selectedAccent);

    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn(`Voice for accent ${this.selectedAccent} not found, using default.`);
    }

    utterance.rate = this.speechSpeed;
    this.synth.speak(utterance);
  }
}
