import styles from './joined-spaces.module.css';
import {
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  Users,
  Star,
  Check,
  CheckCheck,
  MessageSquarePlus,
} from 'lucide-react';

const CHATS = [
  {
    id: 1,
    name: 'Quantum Ethics',
    color: '#6366F1',
    initials: 'QE',
    lastMessage: 'Dr. Vane: I think we need to review the latest submission on neuro-rights.',
    time: '10:42 AM',
    members: '1.2k',
    rating: 4.8,
    status: 'active',
    unread: 3,
  },
  {
    id: 2,
    name: 'Algorithmic Commons',
    color: '#10B981',
    initials: 'AC',
    lastMessage: 'Sarah: Agreed. The dataset is already normalized and ready for the next phase.',
    time: 'Yesterday',
    members: '840',
    rating: 4.5,
    status: 'active',
    unread: 0,
  },
  {
    id: 3,
    name: 'Data Sovereignty Lab',
    color: '#F59E0B',
    initials: 'DS',
    lastMessage: 'System: Space has been archived by the lead curator.',
    time: 'Tuesday',
    members: '450',
    rating: 4.2,
    status: 'closed',
    unread: 0,
  },
  {
    id: 4,
    name: 'Meta-Learning Horizons',
    color: '#EC4899',
    initials: 'ML',
    lastMessage: 'Marcus: Did anyone catch the keynote on zero-shot generalization?',
    time: '04/12/2026',
    members: '2.1k',
    rating: 4.9,
    status: 'active',
    unread: 0,
  },
];

export default function JoinedSpacesPage() {
  return (
    <div className={styles.chatContainer}>
      {/* LEFT SIDEBAR - CHAT LIST */}
      <aside className={styles.chatSidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Your Spaces</h2>
          <button className={styles.iconBtn}>
            <MoreVertical size={20} />
          </button>
        </div>

        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search or start new chat"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.chatList}>
          {CHATS.map((chat) => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${chat.id === 1 ? styles.activeChat : ''}`}
            >
              <div className={styles.avatarWrapper}>
                <div
                  className={styles.chatAvatar}
                  style={{ background: chat.color }}
                >
                  {chat.initials}
                </div>
                <div
                  className={`${styles.statusDot} ${
                    chat.status === 'active' ? styles.statusActive : styles.statusClosed
                  }`}
                  title={`Space is ${chat.status}`}
                />
              </div>

              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <h3 className={styles.chatName}>{chat.name}</h3>
                  <span className={styles.chatTime}>{chat.time}</span>
                </div>

                <div className={styles.chatMetaRow}>
                  <div className={styles.chatMeta}>
                    <span className={styles.metaItem}>
                      <Users size={12} /> {chat.members}
                    </span>
                    <span className={styles.metaItem}>
                      <Star size={12} className={styles.starIcon} /> {chat.rating}
                    </span>
                  </div>
                  {chat.unread > 0 && (
                    <span className={styles.unreadBadge}>{chat.unread}</span>
                  )}
                </div>

                <p className={styles.lastMessage}>
                  {chat.id !== 1 && chat.status !== 'closed' && (
                    <CheckCheck size={14} className={styles.readIcon} />
                  )}
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button className={styles.fabBtn} aria-label="Create New Space">
          <MessageSquarePlus size={24} />
        </button>
      </aside>

      {/* RIGHT SIDE - ACTIVE CHAT */}
      <main className={styles.chatWindow}>
        {/* Chat Header */}
        <header className={styles.windowHeader}>
          <div className={styles.activeHeaderInfo}>
            <div
              className={styles.chatAvatar}
              style={{ background: '#6366F1' }}
            >
              QE
            </div>
            <div>
              <h2 className={styles.windowTitle}>Quantum Ethics</h2>
              <span className={styles.windowSubtitle}>
                1.2k members, 43 online
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn}><Search size={20} /></button>
            <button className={styles.iconBtn}><MoreVertical size={20} /></button>
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className={styles.messagesArea}>
          <div className={styles.dateDivider}>
            <span>Today</span>
          </div>

          <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
            <span className={styles.messageSender}>Elena K.</span>
            <div className={styles.messageContent}>
              I've uploaded the new parameters for the entanglement simulation. 
              We should see less decoherence in the edge cases.
            </div>
            <span className={styles.messageTime}>10:15 AM</span>
          </div>

          <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
            <span className={styles.messageSender}>Marcus W.</span>
            <div className={styles.messageContent}>
              Looks solid. Though I am slightly concerned about the ethical implications of the observer effect in this specific model. Have we run a baseline ethics check?
            </div>
            <span className={styles.messageTime}>10:22 AM</span>
          </div>

          <div className={`${styles.messageBubble} ${styles.messageSent}`}>
            <div className={styles.messageContent}>
              I can run the baseline check this afternoon. I'll use the Stanford framework as a reference point.
            </div>
            <div className={styles.messageStatus}>
              <span className={styles.messageTime}>10:30 AM</span>
              <CheckCheck size={14} className={styles.readIconInfo} />
            </div>
          </div>

          <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
            <span className={styles.messageSender}>Dr. Vane</span>
            <div className={styles.messageContent}>
              I think we need to review the latest submission on neuro-rights before we finalize the baseline. Let's discuss in the sync later.
            </div>
            <span className={styles.messageTime}>10:42 AM</span>
          </div>
        </div>

        {/* Chat Input */}
        <footer className={styles.chatInputArea}>
          <button className={styles.iconBtn}><Smile size={24} /></button>
          <button className={styles.iconBtn}><Paperclip size={24} /></button>
          
          <input
            type="text"
            placeholder="Type a message..."
            className={styles.messageInput}
          />
          
          <button className={styles.iconBtn}><Mic size={24} /></button>
          <button className={styles.sendBtn}><Send size={18} /></button>
        </footer>
      </main>
    </div>
  );
}
