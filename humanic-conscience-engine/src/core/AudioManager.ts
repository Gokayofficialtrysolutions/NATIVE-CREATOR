export class AudioManager {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[];

  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    // The voices are not immediately available, we need to wait for the onvoiceschanged event
    this.synth.onvoiceschanged = () => {
      this.voices = this.synth.getVoices();
    };
  }

  public speak(text: string) {
    if (this.synth.speaking) {
      console.error('Speech synthesis is already in progress.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Find a British English voice
    const britishVoice = this.voices.find(voice => voice.lang === 'en-GB');

    if (britishVoice) {
      utterance.voice = britishVoice;
    } else {
      console.warn('British English voice not found, using default.');
    }

    this.synth.speak(utterance);
  }
}
