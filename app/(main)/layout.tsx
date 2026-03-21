'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './main-layout.module.css';
import {
  Sparkles,
  Compass,
  Users,
  Clock,
  Bell,
  User,
  Search,
  Plus,
  Microscope,
  Settings,
  ArrowLeft,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/nexus', label: 'The Nexus', icon: Sparkles },
  { href: '/discovery', label: 'Space Discovery', icon: Compass },
  { href: '/joined-spaces', label: 'Joined Spaces', icon: Users },
  { href: '/recent-research', label: 'Research', icon: Microscope },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('unispace-theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('unispace-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          {/* Brand */}
          <Link href="/discovery" className={styles.brandSidenav}>
            <em>Unispace</em>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.navItem} ${
                  pathname === href ? styles.navItemActive : ''
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className={styles.sidebarBottom}>
          <Link href="/scholar-profile" className={styles.profileBtn}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div>
              <div className={styles.profileName}>Academic Profile</div>
              <div className={styles.profileRole}>Digital Curator</div>
            </div>
          </Link>

          <button className={styles.settingsBtn}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Top Header */}
        {pathname === '/nexus' && (
          <header className={styles.header}>
            <div className={styles.searchBar}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search the Nexus..."
                className={styles.searchInput}
              />
            </div>
          </header>
        )}

        {/* Global Back Header for nested pages */}
        {!['/nexus', '/discovery', '/joined-spaces', '/recent-research', '/scholar-profile'].includes(pathname) && (
          <div className={styles.backHeader}>
            <button onClick={() => router.back()} className={styles.backBtn}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          </div>
        )}

        {/* Page Content */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
