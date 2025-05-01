
export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
