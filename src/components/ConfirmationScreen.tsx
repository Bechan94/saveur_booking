import { BookingFormData } from '@/types/booking';
import styles from './ConfirmationScreen.module.css';

interface ConfirmationScreenProps {
  booking: BookingFormData;
  onReset: () => void;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ConfirmationScreen({
  booking,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} aria-hidden="true">
        ✓
      </div>
      <h2 className={styles.title}>Столик забронирован</h2>
      <p className={styles.subtitle}>
        Мы ждём вас — детали бронирования ниже
      </p>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Имя гостя</span>
          <span className={styles.summaryValue}>{booking.name}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Дата</span>
          <span className={styles.summaryValue}>{formatDate(booking.date)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Время</span>
          <span className={styles.summaryValue}>{booking.time}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Гостей</span>
          <span className={styles.summaryValue}>{booking.guests}</span>
        </div>
      </div>

      <button type="button" className={styles.button} onClick={onReset}>
        Забронировать ещё
      </button>
    </div>
  );
}
