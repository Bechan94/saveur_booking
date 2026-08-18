import {
  BookingFormData,
  BookingFormErrors,
  MAX_GUESTS,
  MIN_GUESTS,
  TIME_SLOTS,
} from '@/types/booking';



function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Введите имя гостя';
  }
  if (trimmed.length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  return null;
}



export function validatePhone(value: string): string | null {
  if (!value.trim()) {
    return 'Введите номер телефона';
  }
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null;
  }
  return 'Введите номер в формате +7XXXXXXXXXX';
}

export function validateDate(value: string): string | null {
  if (!value) {
    return 'Выберите дату';
  }
  const today = getTodayDateString();
  if (value < today) {
    return 'Дата не может быть раньше сегодняшнего дня';
  }
  return null;
}

export function validateTime(value: string): string | null {
  if (!value) {
    return 'Выберите время';
  }
  if (!TIME_SLOTS.includes(value)) {
    return 'Выберите время из доступных слотов';
  }
  return null;
}

export function validateGuests(value: number | string): string | null {
  const num = typeof value === 'string' ? Number(value) : value;
  if (value === '' || value === null || value === undefined || Number.isNaN(num)) {
    return 'Укажите количество гостей';
  }
  if (!Number.isInteger(num) || num < MIN_GUESTS || num > MAX_GUESTS) {
    return `Количество гостей — от ${MIN_GUESTS} до ${MAX_GUESTS}`;
  }
  return null;
}

export function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const dateError = validateDate(data.date);
  if (dateError) errors.date = dateError;

  const timeError = validateTime(data.time);
  if (timeError) errors.time = timeError;

  const guestsError = validateGuests(data.guests);
  if (guestsError) errors.guests = guestsError;

  return errors;
}
