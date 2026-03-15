import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from './home.module.css'
import { GraduationCap, LogIn, LogOut, Sparkles } from 'lucide-react'
import { logout } from './login/actions'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <GraduationCap size={28} />
          <span>UniSpace</span>
        </div>
        <div>
          {user ? (
            <form action={logout}>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </form>
          ) : (
             <Link href="/login" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', textDecoration: 'none' }}>
                <LogIn size={16} /> Get Started
             </Link>
          )}
        </div>
      </header>

      <section className={`${styles.hero} animate-fade-in`}>
        <h1 className={styles.heroTitle}>Your Campus,<br/>Now Connected.</h1>
        <p className={styles.heroSubtitle}>
          Join the exclusive academic social network for university students, researchers, and alumni. Experience next-gen discussions and opportunities.
        </p>

        {user ? (
          <div className={styles.userCard}>
            <div className={styles.avatar}>
               {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.status}>
                <div className={styles.statusDot}></div> Active Session
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0.5rem 0' }}>Welcome back</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
            </div>
            <Link href="/community" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', justifyContent: 'center' }}>
              <Sparkles size={16} /> Go to Feed
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
             <Link href="/login" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Join the Waitlist</Link>
          </div>
        )}
      </section>
    </main>
  )
}
