import Link from 'next/link';
import styles from './research-list.module.css';
import {
  Users,
  Activity,
  FolderOpen,
  ArrowRight,
  Shield,
  Star,
  Search,
  Plus
} from 'lucide-react';

const JOINED_RESEARCH = [
  {
    id: 'L-04',
    title: 'Advanced Neural Interfacing & Synaptic Ethics',
    spaceCode: 'L-04',
    role: 'Lead Curator',
    members: 24,
    status: 'Active',
    lastActive: '12m ago',
    color: '#6366F1', // Indigo
    tags: ['Neuroscience', 'Ethics']
  },
  {
    id: 'L-12',
    title: 'Climate Impact Data Modeling',
    spaceCode: 'L-12',
    role: 'Analyst',
    members: 142,
    status: 'Active',
    lastActive: '2h ago',
    color: '#10B981', // Emerald
    tags: ['Environment', 'Big Data']
  },
  {
    id: 'Q-99',
    title: 'Quantum Key Distribution Frameworks',
    spaceCode: 'Q-99',
    role: 'Observer',
    members: 8,
    status: 'Archived',
    lastActive: '3w ago',
    color: '#F59E0B', // Amber
    tags: ['Cryptography', 'Physics']
  },
  {
    id: 'S-01',
    title: 'Socio-Economic AI Bias Simulator',
    spaceCode: 'S-01',
    role: 'Contributor',
    members: 56,
    status: 'Active',
    lastActive: '1d ago',
    color: '#EC4899', // Pink
    tags: ['AI Safety', 'Sociology']
  }
];

export default function ResearchListPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Your Research Spaces</h1>
          <p className={styles.pageDesc}>
            Manage and access the collaborative laboratories you've joined.
          </p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Filter research..." 
              className={styles.searchInput}
            />
          </div>
          <button className="btn-primary">
            <Plus size={16} /> New Research
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {JOINED_RESEARCH.map((research) => (
          <Link href={`/recent-research/${research.id}`} key={research.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div 
                className={styles.colorAccent} 
                style={{ backgroundColor: research.color }}
              />
              <div className={styles.headerContent}>
                <span className={styles.spaceCode}>{research.spaceCode}</span>
                <span className={`${styles.statusBadge} ${research.status === 'Archived' ? styles.statusArchived : styles.statusActive}`}>
                  {research.status === 'Active' && <Activity size={12} />}
                  {research.status}
                </span>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{research.title}</h3>
              <div className={styles.tags}>
                {research.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.metaInfo}>
                <span className={styles.metaItem} title="Your Role">
                  <Shield size={14} /> {research.role}
                </span>
                <span className={styles.metaItem} title="Members">
                  <Users size={14} /> {research.members}
                </span>
              </div>
              <div className={styles.footerAction}>
                 <span className={styles.lastActive}>{research.lastActive}</span>
                 <ArrowRight size={16} className={styles.arrowIcon} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
