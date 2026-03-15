import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import styles from './community.module.css'
import { revalidatePath } from 'next/cache'
import { Users, Globe, Building2, CheckCircle } from 'lucide-react'

export type Community = {
  id: string
  name: string
  description: string
  university_id: string | null
  universities?: { name: string } | null
  memberships: { count: number }[]
}

export default async function CommunityPage() {
  const supabase = await createClient()

  // Ensure user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch communities, the university name (if connected), and count the members
  const { data: communitiesData, error: commError } = await supabase
    .from('communities')
    .select(`
      id, name, description, university_id,
      universities(name),
      memberships:community_members(count)
    `)
    .order('created_at', { ascending: false })

  if (commError) {
    console.error('Error fetching communities:', commError)
  }

  const communities = communitiesData as unknown as Community[] || []

  // Fetch the communities the current user is in
  const { data: userMemberships } = await supabase
    .from('community_members')
    .select('community_id')
    .eq('user_id', user.id)

  const userCommunityIds = new Set((userMemberships || []).map(m => m.community_id))

  // --- Server Actions ---
  async function joinCommunity(formData: FormData) {
    'use server'
    const communityId = formData.get('community_id') as string
    
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    
    if (user && communityId) {
      await sb.from('community_members').insert({
        community_id: communityId,
        user_id: user.id
      })
      revalidatePath('/community')
    }
  }

  async function leaveCommunity(formData: FormData) {
    'use server'
    const communityId = formData.get('community_id') as string
    
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    
    if (user && communityId) {
      await sb.from('community_members')
        .delete()
        .eq('community_id', communityId)
        .eq('user_id', user.id)
      revalidatePath('/community')
    }
  }

  return (
    <main className={styles.container}>
      <header className={`${styles.header} animate-fade-in`}>
        <h1 className={styles.title}>Communities</h1>
        <p className={styles.subtitle}>Discover groups to join across universities and the globe.</p>
      </header>

      <div className={`${styles.grid} animate-fade-in`} style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        {communities.map((community) => {
          const isMember = userCommunityIds.has(community.id)
          // The supabase query returns count inside an array due to relation: [{ count: X }]
          const memberCount = community.memberships?.[0]?.count || 0

          return (
            <div key={community.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>{community.name}</h3>
                  {community.university_id ? (
                    <span className={styles.universityTag}>
                      <Building2 size={12} style={{ display: 'inline', marginRight: '4px' }}/>
                      {community.universities?.name || 'University'}
                    </span>
                  ) : (
                    <span className={styles.globalTag}>
                      <Globe size={12} style={{ display: 'inline', marginRight: '4px' }}/>
                      Global
                    </span>
                  )}
                </div>
              </div>
              
              <p className={styles.description}>
                {community.description || 'No description provided.'}
              </p>

              <div className={styles.cardFooter}>
                <span className={styles.memberCount}>
                  <Users size={16} />
                  {memberCount} {memberCount === 1 ? 'member' : 'members'}
                </span>

                {isMember ? (
                  <form action={leaveCommunity}>
                    <input type="hidden" name="community_id" value={community.id} />
                    <button type="submit" className={`btn-secondary ${styles.joinBtn}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', borderColor: '#10b981' }}>
                      <CheckCircle size={16} /> Joined
                    </button>
                  </form>
                ) : (
                  <form action={joinCommunity}>
                    <input type="hidden" name="community_id" value={community.id} />
                    <button type="submit" className={`btn-primary ${styles.joinBtn}`}>
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>
          )
        })}

        {communities.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <Globe size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
            <h3>No communities found.</h3>
            <p>Ensure you ran the SQL script to seed the initial global communities.</p>
          </div>
        )}
      </div>
    </main>
  )
}
