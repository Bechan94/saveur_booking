export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

// Состояние формы
export type BookingStatus = 'idle' | 'loading' | 'success';

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

export const TIME_SLOTS: string[] = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 12;
