import styles from './details.module.css';
import {
  ChevronRight,
  Expand,
  Upload,
  MessageSquare,
  Bookmark,
  Shield,
  Activity,
  Send,
} from 'lucide-react';

const SUB_SPACES = [
  { name: 'Cognitive Load', color: '#6366F1' },
  { name: 'Safety Protocols', color: '#0D9488' },
];

const DISCUSSIONS = [
  {
    author: 'Dr. Aris Thorne',
    time: '12m ago',
    text: 'Is anyone else seeing unexpected latency in the L4-B sensory feedback loop?',
    replies: 8,
  },
  {
    author: 'Julian D.',
    time: '1h ago',
    text: "Added the new synaptic mapping markers to the shared library. Use 'Marker_Set_v2'.",
    replies: 2,
  },
];

export default function ResearchDetailsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {/* Space Header */}
        <div className={styles.spaceHeader}>
          <span className={styles.spaceBadge}>🔬 Active Research Space</span>
          <h1 className={styles.spaceTitle}>
            Advanced Neural Interfacing<br />
            &amp; Synaptic Ethics{' '}
            <span className={styles.spaceCode}>L-04</span>
          </h1>
          <div className={styles.curators}>
            <div className={styles.curatorStack}>
              <div className={styles.curatorAvatar} />
              <div className={styles.curatorAvatar} />
              <div className={styles.curatorAvatar} />
              <span className={styles.curatorMore}>+12</span>
            </div>
            <span className={styles.curatorText}>
              8 Active Curators working now
            </span>
          </div>
        </div>

        {/* Canvas + Resources Row */}
        <div className={styles.workArea}>
          <div className={styles.canvas}>
            <div className={styles.canvasHeader}>
              <h2 className={styles.canvasTitle}>
                <em>Collaborative Canvas</em>
              </h2>
              <button className={styles.canvasExpand}>
                <Expand size={16} />
              </button>
            </div>
            <p className={styles.canvasDesc}>
              Visual mapping for Phase 2 data flow
            </p>
            <div className={styles.canvasPlaceholder}>
              <Activity size={28} />
              <span>Workspace Active: Click to annotate</span>
            </div>
          </div>

          <div className={styles.resources}>
            <h3 className={styles.resourcesTitle}>📦 RESOURCES</h3>
            <div className={styles.resourceCard}>
              <span className={styles.resourceType}>DATASET</span>
              <strong>Neural_Pathway_v</strong>
              <p className={styles.resourceMeta}>
                Updated 2h ago by Sarah K.
              </p>
            </div>
            <button className={styles.uploadBtn}>
              <Upload size={14} />
              Upload Data
            </button>
          </div>
        </div>

        {/* Document Preview */}
        <div className={styles.document}>
          <div className={styles.docHeader}>
            <span className={styles.docIcon}>📄</span>
            <em className={styles.docTitle}>
              The Synaptic Ethics Manifesto (Draft)
            </em>
            <span className={styles.collabDot} />
            <span className={styles.collabText}>Collaborative Mode: ON</span>
          </div>
          <div className={styles.docBody}>
            <h2>Abstract: Defining the Neutral Ground</h2>
            <p>
              As we approach the integration of high-fidelity neural interfaces,
              the primary concern remains not the hardware&apos;s capacity for
              transmission, but the{' '}
              <mark className={styles.highlight}>
                ethical boundaries of synaptic autonomy
              </mark>
              . This research aims to define the &quot;Digital Curator&quot;
              mandate for human-computer interaction...
            </p>
            <p>
              Our Laboratory&apos;s primary hypothesis states that the
              introduction of tertiary-tier logic gates into the prefrontal
              cortex will require a...
            </p>
          </div>
        </div>

        {/* Active Laboratory Footer */}
        <div className={styles.labFooter}>
          <h4 className={styles.labLabel}>ACTIVE LABORATORY</h4>
          <div className={styles.labItem}>
            <span className={styles.labDot} style={{ background: '#0D9488' }} />
            Quantum Ethics
          </div>
          <div className={styles.labItem}>
            <span className={styles.labDot} style={{ background: '#6366F1' }} />
            Bio-Sensing L4
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.widget}>
          <h3 className={styles.widgetTitle}>LABORATORY SUB-SPACES</h3>
          {SUB_SPACES.map((sp) => (
            <div key={sp.name} className={styles.subSpaceItem}>
              <div
                className={styles.subSpaceDot}
                style={{ background: sp.color }}
              />
              <span>{sp.name}</span>
              <ChevronRight size={14} className={styles.chevron} />
            </div>
          ))}
        </div>

        <div className={styles.widget}>
          <div className={styles.widgetHeader}>
            <h3 className={styles.widgetTitle}>ACTIVE DISCUSSION</h3>
            <a href="#" className={styles.viewAllLink}>View All</a>
          </div>
          {DISCUSSIONS.map((d, i) => (
            <div key={i} className={styles.discussionItem}>
              <div className={styles.discussionHeader}>
                <span className={styles.discussionAvatar}>
                  {d.author.split(' ').map(w => w[0]).join('')}
                </span>
                <strong>{d.author}</strong>
                <span className={styles.discussionTime}>{d.time}</span>
              </div>
              <p className={styles.discussionText}>{d.text}</p>
              <div className={styles.discussionActions}>
                <span><MessageSquare size={12} /> {d.replies} Replies</span>
                <span><Bookmark size={12} /> Save</span>
              </div>
            </div>
          ))}
          <div className={styles.threadInput}>
            <input
              type="text"
              placeholder="Start a new thread..."
              className={styles.threadInputField}
            />
            <button className={styles.threadSendBtn}>
              <Send size={14} />
            </button>
          </div>
        </div>

        <div className={styles.healthWidget}>
          <h3 className={styles.healthTitle}>Laboratory Health</h3>
          <div className={styles.healthStats}>
            <div>
              <span className={styles.healthValue}>94%</span>
              <span className={styles.healthLabel}>REVIEW SYNC</span>
            </div>
            <div>
              <span className={styles.healthValue}>3.4k</span>
              <span className={styles.healthLabel}>DATA POINTS</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
