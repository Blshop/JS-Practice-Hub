import { Howl, Howler } from 'howler';

type SoundName = 'correct' | 'incorrect' | 'complete' | 'click' | 'start';

const MUTE_KEY = 'app-sound-muted';

const sounds: Partial<Record<SoundName, Howl>> = {};

const SOUND_NAMES: SoundName[] = ['correct', 'incorrect', 'complete', 'click', 'start'];

function getHowl(name: SoundName): Howl {
  if (!sounds[name]) {
    sounds[name] = new Howl({ src: [`/sounds/${name}.wav`] });
  }
  return sounds[name]!;
}

const muted = localStorage.getItem(MUTE_KEY) === 'true';
Howler.mute(muted);

export const soundService = {
  play(name: SoundName): void {
    getHowl(name).play();
  },

  setMuted(value: boolean): void {
    Howler.mute(value);
    localStorage.setItem(MUTE_KEY, String(value));
  },

  isMuted(): boolean {
    return localStorage.getItem(MUTE_KEY) === 'true';
  },

  toggleMute(): boolean {
    const next = !this.isMuted();
    this.setMuted(next);
    return next;
  },

  setVolume(value: number): void {
    Howler.volume(Math.min(1, Math.max(0, value)));
  },

  preload(names: SoundName[] = SOUND_NAMES): void {
    names.forEach((name) => getHowl(name));
  },
};
