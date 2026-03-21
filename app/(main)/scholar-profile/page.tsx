import styles from './scholar-profile.module.css';
import {
  Globe,
  AtSign,
  Rss,
  FileText,
  ChevronRight,
  Star,
  ExternalLink,
} from 'lucide-react';

const ACTIVE_SPACES = [
  { initials: 'CE', name: 'Computational Ethics', role: 'Admin', members: '4.2k members', color: '#6366F1' },
  { initials: 'ML', name: 'Meta-Learning Lab', role: 'Member', members: '1.1k members', color: '#0D9488' },
  { initials: 'DS', name: 'Data Sovereignty', role: 'Member', members: '890 members', color: '#F59E0B' },
];

export default function ScholarProfilePage() {
  return (
    <div className={styles.page}>
      {/* Cover + Profile Header */}
      <div className={styles.coverArea}>
        <div className={styles.cover} />
        <div className={styles.profileRow}>
          <div className={styles.avatarLarge} />
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>Dr. Julian Vane</h1>
            <p className={styles.profileRole}>
              Senior Curator of Computational Ethics
            </p>
            <div className={styles.profileMeta}>
              <span>🏛 Stanford University</span>
              <span>📍 Palo Alto, CA</span>
              <span className={styles.verified}>✅ Verified Researcher</span>
            </div>
          </div>
          <div className={styles.profileActions}>
            <button className={styles.followBtn}>Follow</button>
            <button className={styles.messageBtn}>Message</button>
          </div>
        </div>
      </div>

      {/* Bio + Research Portfolio */}
      <div className={styles.twoCol}>
        <div className={styles.bioCard}>
          <h2 className={styles.cardTitle}>📖 Biography</h2>
          <blockquote className={styles.bioQuote}>
            &ldquo;My work focuses on the intersection of human-centric design
            and automated governance. I believe that data curation is the new
            librarianism — essential for preserving the integrity of our shared
            digital consciousness.&rdquo;
          </blockquote>
          <div className={styles.bioLinks}>
            <button className={styles.bioLinkBtn}><Globe size={16} /></button>
            <button className={styles.bioLinkBtn}><AtSign size={16} /></button>
            <button className={styles.bioLinkBtn}><Rss size={16} /></button>
          </div>
        </div>

        <div className={styles.portfolioCard}>
          <div className={styles.portfolioHeader}>
            <h2 className={styles.cardTitle}>🎓 Research Portfolio</h2>
            <div className={styles.portfolioStats}>
              <span>Papers: <strong>14</strong></span>
              <span>Citations: <strong>2.1k</strong></span>
            </div>
          </div>
          <div className={styles.featuredPub}>
            <span className={styles.featuredBadge}>FEATURED PUBLICATION</span>
            <span className={styles.pubDate}>Oct 2023</span>
            <h3 className={styles.pubTitle}>
              The Algorithmic Commons: Redefining Public Spaces in the Age of AI
            </h3>
            <p className={styles.pubDesc}>
              This paper explores how generative models are reshaping our
              understanding of intellectual property and public discourse within
              digital ecosystems...
            </p>
            <div className={styles.pubActions}>
              <button className={styles.pdfBtn}>
                <FileText size={14} /> PDF
              </button>
              <a href="#" className={styles.citationsLink}>
                View Citations (412)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Active Spaces + Datasets/Collab */}
      <div className={styles.twoCol}>
        <div>
          <h2 className={styles.sectionTitle}>🌐 Active Spaces</h2>
          <div className={styles.spacesList}>
            {ACTIVE_SPACES.map((sp) => (
              <div key={sp.name} className={styles.spaceItem}>
                <div
                  className={styles.spaceInitials}
                  style={{ background: sp.color }}
                >
                  {sp.initials}
                </div>
                <div className={styles.spaceInfo}>
                  <strong>{sp.name}</strong>
                  <p>{sp.role} • {sp.members}</p>
                </div>
                <ChevronRight size={16} className={styles.chevron} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.datasetCard}>
            <span className={styles.datasetBadge}>📊 DATASET</span>
            <h3 className={styles.datasetTitle}>
              Nexus-Open: Semantic Mesh v1.4
            </h3>
            <p className={styles.datasetMeta}>
              12.4GB • JSONL • 1.2M entries
            </p>
            <div className={styles.datasetFooter}>
              <span className={styles.datasetTag}>Social Graph</span>
              <Star size={16} className={styles.starIcon} />
            </div>
          </div>

          <div className={styles.collabCard}>
            <span className={styles.collabBadge}>⭐ COLLABORATION</span>
            <h3 className={styles.collabTitle}>Open-Syllabus Initiative</h3>
            <p className={styles.collabMeta}>Lead Contributor • Active Phase</p>
            <div className={styles.collabAvatars}>
              <div className={styles.miniAvatar} />
              <div className={styles.miniAvatar} />
              <div className={styles.miniAvatar} />
              <span className={styles.collabMore}>+12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scholar Activity */}
      <section className={styles.activitySection}>
        <h2 className={styles.sectionTitle}>📝 Scholar Activity</h2>
        <div className={styles.activityItem}>
          <div className={styles.activityDot} />
          <div>
            <span className={styles.activityType}>POST</span>
            <span className={styles.activityTime}> • 4h ago</span>
          </div>
          <button className={styles.activityMore}>
            <ExternalLink size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
