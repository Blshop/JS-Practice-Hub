import type { LocalizedString } from 'types/Questions';

export function localize(value: LocalizedString, lang: string): string {
  return (value as Record<string, string>)[lang] ?? value.en ?? '';
}
