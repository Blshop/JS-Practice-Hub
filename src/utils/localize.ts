import type { LocalizedString } from 'types/Questions';

export function localize(value: LocalizedString | string | null | undefined, lang: string): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  const shortLang = lang.split('-')[0];
  return (value as Record<string, string>)[shortLang] ?? value.en ?? '';
}
