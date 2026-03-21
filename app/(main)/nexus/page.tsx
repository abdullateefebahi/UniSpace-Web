'use client';

import styles from './nexus.module.css';
import {
  Link as LinkIcon,
  Code,
  BarChart3,
  Image,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
  Bookmark,
  FileText,
  Download,
} from 'lucide-react';

const POSTS = [
  {
    id: 1,
    author: 'Dr. Aris Thorne',
    field: 'QUANTUM COMPUTING & CRYPTOGRAPHY',
    time: '2h ago',
    title: 'Decentralized Trust in Post-Quantum Distributed Systems',
    excerpt:
      'Just published our latest findings on how lattice-based cryptography can be integrated into existing blockchain architectures without compromising throughput...',
    attachment: {
      type: 'RESEARCH PAPER',
      name: 'Lattice_Structure_Draft_v4.pdf',
    },
    votes: 142,
    comments: 28,
  },
  {
    id: 2,
    author: 'Astro_Network',
    field: 'DATA ANALYSIS',
    time: '5h ago',
    title: 'New Visualization of Cosmic Web Intersections',
    excerpt:
      'Mapping the dark matter filaments connecting distant galaxy clusters using the new telemetry data from JWST.',
    votes: '2.4k',
    comments: 105,
  },
];

const TRENDING = [
  { label: 'PHYSICS', title: 'Fusion Breakthroughs 2024', meta: '12.4k Scholars active' },
  { label: 'MEDICINE', title: 'CRISPR Ethics Workshop', meta: '8.1k Scholars active' },
  { label: 'CS', title: 'LLM Safety Protocols', meta: '24k Scholars active' },
];

const SCHOLARS = [
  { name: 'Dr. Elena Volkov', field: 'Cognitive Neuroscience' },
  { name: 'Prof. Julian Reed', field: 'Linguistic Theory' },
];

export default function NexusPage() {
  return (
    <div className={styles.page}>
      <div className={styles.feed}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>The Nexus</h1>
          <p className={styles.pageSubtitle}>
            Explore the latest insights and breakthroughs from across your network.
          </p>
        </div>

        {/* Composer */}
        <div className={styles.composer}>
          <div className={styles.composerRow}>
            <div className={styles.composerAvatar} />
            <input
              type="text"
              placeholder="Share an insight, paper, or code snippet..."
              className={styles.composerInput}
            />
          </div>
          <div className={styles.composerActions}>
            <div className={styles.composerTools}>
              <button className={styles.toolBtn}><LinkIcon size={16} /></button>
              <button className={styles.toolBtn}><Code size={16} /></button>
              <button className={styles.toolBtn}><BarChart3 size={16} /></button>
              <button className={styles.toolBtn}><Image size={16} /></button>
            </div>
            <button className={styles.postBtn}>Post Insight</button>
          </div>
        </div>

        {/* Posts */}
        {POSTS.map((post) => (
          <article key={post.id} className={styles.post}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar} />
              <div>
                <strong className={styles.postAuthor}>{post.author}</strong>
                <p className={styles.postField}>{post.field}</p>
              </div>
              <span className={styles.postTime}>{post.time}</span>
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postExcerpt}>{post.excerpt}</p>

            {post.attachment && (
              <div className={styles.attachment}>
                <FileText size={16} />
                <div>
                  <span className={styles.attachType}>{post.attachment.type}</span>
                  <span className={styles.attachName}>{post.attachment.name}</span>
                </div>
                <Download size={16} className={styles.attachDownload} />
              </div>
            )}

            <div className={styles.postActions}>
              <div className={styles.voteGroup}>
                <ArrowUp size={16} />
                <span>{post.votes}</span>
                <ArrowDown size={16} />
              </div>
              <button className={styles.actionBtn}>
                <MessageSquare size={14} /> {post.comments}
              </button>
              <button className={styles.actionBtn}>
                <Share2 size={14} /> Share
              </button>
              <button className={styles.actionBtn}>
                <Bookmark size={14} /> Cite
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Right Sidebar */}
      <aside className={styles.rightSidebar}>
        <div className={styles.widget}>
          <h3 className={styles.widgetTitle}>📈 Trending Spaces</h3>
          {TRENDING.map((item) => (
            <div key={item.title} className={styles.trendItem}>
              <span className={styles.trendLabel}>{item.label}</span>
              <strong className={styles.trendTitle}>{item.title}</strong>
              <p className={styles.trendMeta}>{item.meta}</p>
            </div>
          ))}
        </div>

        <div className={styles.widget}>
          <h3 className={styles.widgetTitle}>Recommended Scholars</h3>
          {SCHOLARS.map((s) => (
            <div key={s.name} className={styles.scholarItem}>
              <div className={styles.scholarAvatar} />
              <div className={styles.scholarInfo}>
                <strong>{s.name}</strong>
                <p>{s.field}</p>
              </div>
              <button className={styles.followBtn}>Follow</button>
            </div>
          ))}
        </div>

        <div className={styles.widgetDark}>
          <h3 className={styles.widgetTitle}>Recent Research</h3>
          <div className={styles.researchItem}>
            <span className={styles.researchLabel}>LAST READ</span>
            <p>Neural Radiance Fields for Medical Imaging Applications</p>
          </div>
          <div className={styles.researchItem}>
            <span className={styles.researchLabel}>BOOKMARKED</span>
            <p>Socio-economic impact of Universal Basic Income models...</p>
          </div>
          <button className={styles.openLibBtn}>Open Library</button>
        </div>
      </aside>
    </div>
  );
}
