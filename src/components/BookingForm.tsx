import { FormEvent, useState } from 'react';

import {
  BookingFormData,
  BookingFormErrors,
  TIME_SLOTS,
  MIN_GUESTS,
  MAX_GUESTS,
} from '@/types/booking';

import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
  validateBookingForm,
} from '@/utils/validation';

import styles from './BookingForm.module.css';

interface BookingFormProps {
  onSuccess: (data: BookingFormData) => void;
}

const EMPTY_FORM: BookingFormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
};

type FieldName = keyof BookingFormData;

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validateField(name: FieldName, data: BookingFormData): string | null {
  
  switch (name) {
    case 'name':
      return validateName(data.name);
    case 'phone':
      return validatePhone(data.phone);
    case 'date':
      return validateDate(data.date);
    case 'time':
      return validateTime(data.time);
    case 'guests':
      return validateGuests(data.guests);
    default:
      return null;
  }
}

export default function BookingForm({ onSuccess }: BookingFormProps) {

  const [formData, setFormData] = useState<BookingFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayString = getTodayDateString();

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    const fieldName = name as FieldName;

    const nextFormData: BookingFormData = {
      ...formData,
      [fieldName]: fieldName === 'guests' ? Number(value) : value,
    };
    setFormData(nextFormData);

    if (touched[fieldName]) {
      const error = validateField(fieldName, nextFormData);
      setErrors((prev) => ({ ...prev, [fieldName]: error ?? undefined }));
    }
  }

  function handleBlur(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement>
  ) {
    const fieldName = event.target.name as FieldName;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, formData);
    setErrors((prev) => ({ ...prev, [fieldName]: error ?? undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      phone: true,
      date: true,
      time: true,
      guests: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(formData);
    }, 1500);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Имя гостя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Как к вам обращаться"
          disabled={isSubmitting}
        />
        <span className={styles.errorText}>{errors.name ?? ''}</span>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">
          Номер телефона
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+7 999 123-45-67"
          disabled={isSubmitting}
        />
        <span className={styles.errorText}>{errors.phone ?? ''}</span>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Дата
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={todayString}
            className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          <span className={styles.errorText}>{errors.date ?? ''}</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="time">
            Время
          </label>
          <select
            id="time"
            name="time"
            className={`${styles.select} ${errors.time ? styles.inputError : ''}`}
            value={formData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <option value="">Выберите время</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <span className={styles.errorText}>{errors.time ?? ''}</span>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="guests">
          Количество гостей
        </label>
        <input
          id="guests"
          name="guests"
          type="number"
          min={MIN_GUESTS}
          max={MAX_GUESTS}
          className={`${styles.input} ${errors.guests ? styles.inputError : ''}`}
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        <span className={styles.errorText}>{errors.guests ?? ''}</span>
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            Бронирую...
          </>
        ) : (
          'Забронировать столик'
        )}
      </button>
    </form>
  );
}
