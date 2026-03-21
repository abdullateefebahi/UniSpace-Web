'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './splash.module.css';

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const redirectTimer = setTimeout(() => router.replace('/discovery'), 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className={`${styles.splash} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.logo}>Unispace</h1>
        <div className={styles.tagline}>The Digital Curator of Universal Knowledge</div>
        <div className={styles.loader}>
          <div className={styles.loaderBar} />
        </div>
      </div>
    </main>
  );
}
