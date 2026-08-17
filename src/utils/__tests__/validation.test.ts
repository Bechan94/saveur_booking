import { describe, expect, it } from 'vitest';
import {
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
  validateTime,
} from '../validation';

describe('validatePhone', () => {
  it('принимает номер в формате +7XXXXXXXXXX', () => {
    expect(validatePhone('+79991234567')).toBeNull();
  });

  it('принимает номер в формате 8XXXXXXXXXX', () => {
    expect(validatePhone('89991234567')).toBeNull();
  });

  it('принимает номер с пробелами, скобками и дефисами', () => {
    expect(validatePhone('+7 (999) 123-45-67')).toBeNull();
    expect(validatePhone('8 999 123 45 67')).toBeNull();
  });

  it('отклоняет пустое значение', () => {
    expect(validatePhone('')).toBe('Введите номер телефона');
  });

  it('отклоняет номер с недостаточным количеством цифр', () => {
    expect(validatePhone('+7999123456')).not.toBeNull();
  });

  it('отклоняет номер с лишними цифрами', () => {
    expect(validatePhone('+799912345678')).not.toBeNull();
  });

  it('отклоняет номер с неверным кодом страны', () => {
    expect(validatePhone('+19991234567')).not.toBeNull();
  });

  it('отклоняет нечисловую строку', () => {
    expect(validatePhone('не телефон')).not.toBeNull();
  });
});

describe('validateName', () => {
  it('отклоняет пустое имя', () => {
    expect(validateName('')).not.toBeNull();
  });

  it('отклоняет имя короче 2 символов', () => {
    expect(validateName('A')).not.toBeNull();
  });

  it('принимает корректное имя', () => {
    expect(validateName('Иван')).toBeNull();
  });
});

describe('validateDate', () => {
  it('отклоняет пустую дату', () => {
    expect(validateDate('')).not.toBeNull();
  });

  it('отклоняет дату в прошлом', () => {
    expect(validateDate('2000-01-01')).not.toBeNull();
  });

  it('принимает сегодняшнюю дату', () => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(validateDate(iso)).toBeNull();
  });
});

describe('validateTime', () => {
  it('принимает валидный слот', () => {
    expect(validateTime('12:00')).toBeNull();
  });

  it('отклоняет время вне слотов', () => {
    expect(validateTime('12:30')).not.toBeNull();
  });

  it('отклоняет пустое значение', () => {
    expect(validateTime('')).not.toBeNull();
  });
});

describe('validateGuests', () => {
  it('принимает значения в диапазоне 1-12', () => {
    expect(validateGuests(1)).toBeNull();
    expect(validateGuests(12)).toBeNull();
    expect(validateGuests(6)).toBeNull();
  });

  it('отклоняет 0 и отрицательные значения', () => {
    expect(validateGuests(0)).not.toBeNull();
    expect(validateGuests(-1)).not.toBeNull();
  });

  it('отклоняет значения больше 12', () => {
    expect(validateGuests(13)).not.toBeNull();
  });
});
