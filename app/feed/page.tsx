import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import styles from './feed.module.css'
import { CreatePostForm } from './CreatePostForm'
import { InteractivePost } from './InteractivePost'

// Custom relative time formatter
function getRelativeTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export default async function FeedPage() {
  const supabase = await createClient()

  // Ensure user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get the current user's profile info
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .single()

  // Fetch the communities the user is currently a member of, for the dropdown
  const { data: userCommunities } = await supabase
    .from('community_members')
    .select('community_id, communities(id, name)')
    .eq('user_id', user.id)

  const dropdownOptions = userCommunities?.map((c: any) => c.communities) || []

  // Fetch posts globally, ordering by newest
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, content, image_url, created_at,
      profiles:author_id (username, full_name, avatar_url, role),
      communities:community_id (name)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  // Fetch all likes explicitly belonging to the current user
  const { data: userLikes } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', user.id)

  const likedPostIds = new Set((userLikes || []).map(l => l.post_id))

  return (
    <main className={styles.container}>
      
      {/* Create Post Section */}
      <CreatePostForm 
        avatarInitials={profile?.username?.charAt(0).toUpperCase() || 'U'} 
        dropdownOptions={dropdownOptions}
      />

      {/* Feed List Section */}
      <div className={`${styles.feedList} animate-fade-in`} style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {(posts || []).map((post: any) => (
          <InteractivePost 
             key={post.id} 
             post={post} 
             currentUserId={user.id} 
             relativeTime={getRelativeTime(post.created_at)} 
             initialHasLiked={likedPostIds.has(post.id)}
          />
        ))}

        {(!posts || posts.length === 0) && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p>No posts yet. Be the first to start the conversation!</p>
          </div>
        )}
      </div>

    </main>
  )
}
