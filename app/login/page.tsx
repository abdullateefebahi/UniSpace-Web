import { login, signup } from './actions'
import styles from './login.module.css'
import { GraduationCap } from 'lucide-react'

// Using Promise<{...}> for searchParams to support Next.js 15+ asynchronous searchParams
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const unresolvedSearchParams = await searchParams
  const message = unresolvedSearchParams?.message

  return (
    <div className={styles.container}>
      <div className={`${styles.loginCard} animate-fade-in`}>
        <div className={styles.logoBox}>
          <GraduationCap size={48} color="var(--brand-primary)" />
        </div>
        <h1 className={styles.title}>Welcome to UniSpace</h1>
        <p className={styles.subtitle}>Connect with your campus community</p>

        <form>
          {message && <div className={styles.errorBox}>{message}</div>}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              University Email
            </label>
            <input
              className="input-base"
              id="email"
              name="email"
              type="email"
              placeholder="you@university.edu"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className="input-base"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              formAction={login}
              className="btn-primary"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="btn-secondary"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
