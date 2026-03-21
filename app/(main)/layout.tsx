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
  Star,
  Bookmark,
  Inbox,
  Moon,
  Sun,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/nexus', label: 'Nexus', icon: Sparkles },
  { href: '/discovery', label: 'Discovery', icon: Compass },
  { href: '/joined-spaces', label: 'Spaces', icon: Users },
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                <Icon size={18} className={styles.navIcon} />
                <span className={styles.navLabel}>{label}</span>
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

          <div className={styles.bottomActions}>
            <button className={styles.settingsBtn}>
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setIsDrawerOpen(false)} />
      )}
      
      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerAvatar}>
            <User size={24} />
          </div>
          <div className={styles.drawerProfileInfo}>
            <span className={styles.drawerName}>Academic Profile</span>
            <span className={styles.drawerHandle}>@DigitalCurator</span>
            <div className={styles.drawerStats}>
              <span><strong>142</strong> Following</span>
              <span><strong>89</strong> Followers</span>
            </div>
          </div>
        </div>

        <nav className={styles.drawerNav}>
          <Link href="/scholar-profile" className={styles.drawerNavItem} onClick={() => setIsDrawerOpen(false)}>
            <User size={20} /> Profile
          </Link>
          <Link href="#" className={styles.drawerNavItem}>
            <Star size={20} /> Premium
          </Link>
          <Link href="#" className={styles.drawerNavItem}>
            <Bookmark size={20} /> Bookmarks
          </Link>
          <Link href="#" className={styles.drawerNavItem}>
            <Inbox size={20} /> Inbox
          </Link>
          <Link href="#" className={styles.drawerNavItem}>
            <Settings size={20} /> Settings
          </Link>
        </nav>
        
        <div className={styles.drawerFooter}>
           <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Mobile Top Header */}
        {pathname !== '/scholar-profile' && (
          <header className={styles.mobileHeader}>
            <button className={styles.mobileAvatarBtn} onClick={() => setIsDrawerOpen(true)}>
              <User size={18} />
            </button>
            <em className={styles.mobileBrand}>Unispace</em>
            <div style={{ width: 32 }} /> {/* Spacer */}
          </header>
        )}

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
        {!['/nexus', '/discovery', '/joined-spaces', '/recent-research'].includes(pathname) && (
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
