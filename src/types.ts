
export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export type LegalPageType = 'impressum' | 'datenschutz' | 'agb' | 'widerruf';
