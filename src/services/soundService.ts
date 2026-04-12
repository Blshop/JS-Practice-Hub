type SoundName = 'correct' | 'incorrect' | 'complete' | 'click' | 'start';

const MUTE_KEY = 'app-sound-muted';

const cache: Partial<Record<SoundName, HTMLAudioElement>> = {};

let muted = localStorage.getItem(MUTE_KEY) === 'true';
let volume = 1;

function getAudio(name: SoundName): HTMLAudioElement {
  if (!cache[name]) {
    cache[name] = new Audio(`/sounds/${name}.wav`);
  }
  return cache[name]!;
}

export const soundService = {
  play(name: SoundName): void {
    if (muted) return;
    const audio = getAudio(name);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  },

  setMuted(value: boolean): void {
    muted = value;
    localStorage.setItem(MUTE_KEY, String(value));
  },

  isMuted(): boolean {
    return muted;
  },

  toggleMute(): boolean {
    muted = !muted;
    localStorage.setItem(MUTE_KEY, String(muted));
    return muted;
  },

  setVolume(value: number): void {
    volume = Math.min(1, Math.max(0, value));
  },

  preload(names: SoundName[] = ['correct', 'incorrect', 'complete', 'click', 'start']): void {
    names.forEach((name) => getAudio(name));
  },
};
