'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/nexus', label: 'The Nexus', icon: Sparkles },
  { href: '/discovery', label: 'Space Discovery', icon: Compass },
  { href: '/joined-spaces', label: 'Joined Spaces', icon: Users },
  { href: '/recent-research', label: 'Recent Research', icon: Clock },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          {/* Profile */}
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div>
              <div className={styles.profileName}>Academic Profile</div>
              <div className={styles.profileRole}>Digital Curator</div>
            </div>
          </div>

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

        {/* New Research Button */}
        <button className={styles.newResearchBtn}>
          <Plus size={18} />
          <span>New Research</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Top Header */}
        <header className={styles.header}>
          <Link href="/discovery" className={styles.brand}>
            <em>Unispace</em>
          </Link>

          <div className={styles.searchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search the Nexus..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} aria-label="Notifications">
              <Bell size={20} />
            </button>
            <button className={styles.iconBtn} aria-label="Profile">
              <User size={20} />
            </button>
            <button className={styles.toggleBtn}>Toggle Mode</button>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
