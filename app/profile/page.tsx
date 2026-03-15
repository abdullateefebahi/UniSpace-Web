import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import styles from './profile.module.css'
import { revalidatePath } from 'next/cache'

// Define the shape of our profile data
export type Profile = {
  id: string
  username: string
  full_name: string
  avatar_url: string
  role: 'Student' | 'Researcher' | 'Recruiter' | 'Alumni'
  university_id: string | null
  bio: string
}

export type University = {
  id: string
  name: string
  domain: string
}

export default async function ProfilePage() {
  const supabase = await createClient()

  // Ensure user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the user's profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  // If no profile exists for some reason, they are either an old user
  // before the trigger, or something went wrong. Let's create an empty mock Profile
  const currentProfile: Profile = profile || {
    id: user.id,
    username: user.email?.split('@')[0] || 'Unknown',
    full_name: '',
    avatar_url: '',
    role: 'Student',
    university_id: null,
    bio: ''
  }

  // Fetch all available universities for the dropdown
  const { data: universities } = await supabase
    .from('universities')
    .select('*')
    .order('name')

  // The Server Action that handles the form submission
  async function updateProfile(formData: FormData) {
    'use server'

    const supabase = await createClient()

    const updates = {
      username: formData.get('username') as string,
      full_name: formData.get('full_name') as string,
      bio: formData.get('bio') as string,
      role: formData.get('role') as string,
      university_id: formData.get('university_id') as string,
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })
    
    if (error) {
      console.error('Error updating profile:', error)
    }

    revalidatePath('/profile')
  }

  return (
    <main className={styles.container}>
      <header className={`${styles.profileHeader} animate-fade-in`}>
        <div className={styles.avatar}>
           {currentProfile.username.charAt(0).toUpperCase()}
        </div>
        <div className={styles.details}>
          <h1 className={styles.username}>@{currentProfile.username}</h1>
          <div className={styles.role}>{currentProfile.role || 'Student'}</div>
          {currentProfile.full_name && (
            <p style={{ fontWeight: 600 }}>{currentProfile.full_name}</p>
          )}
          {currentProfile.bio && (
            <p className={styles.bio}>{currentProfile.bio}</p>
          )}
        </div>
      </header>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Edit Profile</h2>
        <form action={updateProfile} className={styles.editForm}>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input 
              id="username"
              name="username"
              className="input-base"
              defaultValue={currentProfile.username}
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="full_name">Full Name</label>
            <input 
              id="full_name"
              name="full_name"
              className="input-base"
              defaultValue={currentProfile.full_name}
              placeholder="e.g. John Doe"
            />
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="role">Your Role</label>
            <select 
              id="role"
              name="role"
              className="input-base"
              defaultValue={currentProfile.role}
              required
            >
              <option value="Student">Student</option>
              <option value="Researcher">Researcher</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="university_id">University Affiliation</label>
            <select 
              id="university_id"
              name="university_id"
              className="input-base"
              defaultValue={currentProfile.university_id || ''}
            >
              <option value="" disabled>Select your University</option>
              {(universities || []).map((uni: University) => (
                <option key={uni.id} value={uni.id}>{uni.name}</option>
              ))}
            </select>
            <small style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Select the university you attend or represent.</small>
          </div>

          <div className={styles.formGroup}>
             <label className={styles.label} htmlFor="bio">Bio</label>
             <textarea 
               id="bio"
               name="bio"
               className={`input-base ${styles.textarea}`}
               defaultValue={currentProfile.bio}
               placeholder="Tell the community about yourself..."
             />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
            Save Changes
          </button>
        </form>
      </div>
    </main>
  )
}
