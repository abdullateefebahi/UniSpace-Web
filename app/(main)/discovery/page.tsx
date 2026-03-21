import styles from './discovery.module.css';
import {
  Search,
  Plus,
  ArrowRight,
  Atom,
  Palette,
  Landmark,
  Gamepad2,
  Globe,
  Pencil,
  Star,
  MessageSquare,
  Calendar,
} from 'lucide-react';

const CURATED_FIELDS = [
  { name: 'Quantum Physics', count: '1.2k Active Scholars', icon: Atom },
  { name: 'Digital Art', count: '840 Creators', icon: Palette },
  { name: 'Political Science', count: '2.5k Discussions', icon: Landmark },
  { name: 'Gaming Communities', count: '4.1k Members', icon: Gamepad2 },
];

const TRENDING_SPACES = [
  {
    name: 'Neural Topology Lab',
    desc: 'Exploring the intersections of mathematics and neurological mapping.',
    tags: ['#neuroscience', '#topology'],
    badge: 'HIGH ACTIVITY',
    badgeColor: '#0D9488',
    icon: Globe,
    iconBg: '#E0F2FE',
  },
  {
    name: 'The Bauhaus Archive',
    desc: 'A digital gallery and discussion space for modernist architecture and design.',
    tags: ['#architecture', '#modernism'],
    badge: 'SOCIAL FOCUS',
    badgeColor: '#6366F1',
    icon: Pencil,
    iconBg: '#FEF3C7',
  },
  {
    name: 'Algorithmic Ethics',
    desc: 'Analyzing the sociological impact of AI decision making systems.',
    tags: ['#ai_ethics', '#policy'],
    badge: 'VERIFIED RESEARCH',
    badgeColor: '#0D9488',
    icon: Star,
    iconBg: '#ECFDF5',
  },
];

export default function DiscoveryPage() {
  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Discover intellectual domains and{' '}
          <span className={styles.heroAccent}>vibrant communities.</span>
        </h1>
        <p className={styles.heroDesc}>
          Explore the Nexus of global research. Join specialized spaces where
          inquiry meets community engagement.
        </p>
        <div className={styles.heroActions}>
          <div className={styles.heroSearch}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Quantum Computing, Late Renaissance Art..."
              className={styles.heroSearchInput}
            />
            <button className={styles.heroSearchBtn}>Search</button>
          </div>
          <button className="btn-secondary">
            <Plus size={16} />
            Create Your Own Space
          </button>
        </div>
      </section>

      {/* Curated Fields */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Curated Fields</h2>
          <a href="#" className={styles.viewAll}>
            View All Categories <ArrowRight size={14} />
          </a>
        </div>
        <div className={styles.fieldsGrid}>
          {CURATED_FIELDS.map((field) => (
            <div key={field.name} className={styles.fieldCard}>
              <field.icon size={24} className={styles.fieldIcon} />
              <h3 className={styles.fieldName}>{field.name}</h3>
              <p className={styles.fieldCount}>{field.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Spaces */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Trending Spaces</h2>
          <div className={styles.filterTabs}>
            <button className={`${styles.filterTab} ${styles.filterTabActive}`}>
              Social
            </button>
            <button className={styles.filterTab}>Research</button>
            <button className={styles.filterTab}>Professional</button>
          </div>
        </div>
        <div className={styles.spacesGrid}>
          {TRENDING_SPACES.map((space) => (
            <div key={space.name} className={styles.spaceCard}>
              <div className={styles.spaceCardTop}>
                <div
                  className={styles.spaceIcon}
                  style={{ background: space.iconBg }}
                >
                  <space.icon size={18} />
                </div>
                <span
                  className={styles.spaceBadge}
                  style={{ background: space.badgeColor }}
                >
                  {space.badge}
                </span>
              </div>
              <h3 className={styles.spaceName}>{space.name}</h3>
              <p className={styles.spaceDesc}>{space.desc}</p>
              <div className={styles.spaceTags}>
                {space.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.spaceFooter}>
                <div className={styles.avatarStack}>
                  <div className={styles.stackAvatar} />
                  <div className={styles.stackAvatar} />
                  <div className={styles.stackAvatar} />
                </div>
                <a href="#" className={styles.joinLink}>
                  Join Space
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Scholarly Activity + Curator's Spotlight */}
      <section className={styles.bottomRow}>
        <div className={styles.activitySection}>
          <h2 className={styles.sectionTitle}>
            <em>Recent Scholarly Activity</em>
          </h2>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} />
              <div>
                <p className={styles.activityText}>
                  <strong>Paper Published:</strong> Quantum Entanglement in
                  Silicon
                </p>
                <p className={styles.activityMeta}>
                  Shared by Dr. Elena Volkov in Quantum Physics Lab
                </p>
                <div className={styles.activityActions}>
                  <span className={styles.insightBadge}>
                    🔥 Insight of the Day
                  </span>
                  <span>
                    <MessageSquare size={12} /> 24 Comments
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} />
              <div>
                <p className={styles.activityText}>
                  <strong>Open Symposium:</strong> Digital Humanities 2024
                </p>
                <p className={styles.activityMeta}>
                  Organized by Nexus Archive
                </p>
                <div className={styles.activityActions}>
                  <span>
                    <Calendar size={12} /> Starts in 2 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.spotlight}>
          <h3 className={styles.spotlightLabel}>Curator&apos;s Spotlight</h3>
          <blockquote className={styles.spotlightQuote}>
            &ldquo;The beauty of Unispace lies not just in the data we host, but
            in the connections we foster between disparate fields.&rdquo;
          </blockquote>
          <div className={styles.spotlightAuthor}>
            <div className={styles.spotlightAvatar} />
            <div>
              <strong>Julian Sterling</strong>
              <p className={styles.spotlightRole}>
                Chief Information Architect
              </p>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '1rem' }}>
            Read Interview
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <strong>Unispace</strong>
          <p className={styles.footerTagline}>
            The Digital Curator of Universal Knowledge.
          </p>
        </div>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Ethical Research Code</a>
          <a href="#">API Reference</a>
        </div>
        <p className={styles.footerCopy}>
          &copy; 2024 Unispace Academic Systems.
        </p>
      </footer>
    </div>
  );
}
