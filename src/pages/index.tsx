import { useState } from 'react';

import Head from 'next/head';

import BookingForm from '@/components/BookingForm';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { BookingFormData } from '@/types/booking';

import styles from '@/styles/Home.module.css';

export default function Home() {
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  function handleSuccess(data: BookingFormData) {
    setBooking(data);
  }

  function handleReset() {
    setBooking(null);
  }

  return (
    <>
      <Head>
        <title>SAVEUR — Бронирование столика</title>
        <meta
          name="description"
          content="Онлайн-бронирование столика в ресторане SAVEUR"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>SAVEUR</span>
            <h1 className={styles.title}>Бронирование столика</h1>
            {!booking && (
              <p className={styles.description}>
                Заполните форму, и мы забронируем для вас столик
              </p>
            )}
          </div>

          <div key={booking ? 'confirmation' : 'form'} className={styles.content}>
            {booking ? (
              <ConfirmationScreen booking={booking} onReset={handleReset} />
            ) : (
              <BookingForm onSuccess={handleSuccess} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
