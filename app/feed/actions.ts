'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// ... (previous createPost code)

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const content = formData.get('content') as string
  const communityId = formData.get('community_id') as string | null
  const file = formData.get('image') as File | null

  if (!content || content.trim() === '') return

  let imageUrl = null

  if (file && file.size > 0 && file.name) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `post-images/${fileName}`

    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('post-media')
      .upload(filePath, file)

    if (storageError) {
      console.error('Error uploading image:', storageError)
    } else if (storageData) {
      const { data: publicUrlData } = supabase
        .storage
        .from('post-media')
        .getPublicUrl(storageData.path)
      imageUrl = publicUrlData.publicUrl
    }
  }

  const newPost = {
    author_id: user.id,
    content: content,
    community_id: communityId && communityId !== 'null' ? communityId : null,
    image_url: imageUrl,
  }

  const { error } = await supabase.from('posts').insert(newPost)
  if (error) console.error('Error creating post:', error)

  revalidatePath('/feed')
}

// Phase 5 Actions
export async function toggleLike(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const postId = formData.get('post_id') as string
  const hasLiked = formData.get('has_liked') === 'true'

  if (hasLiked) {
    // Unlike it by deleting the database row mapping user to post
    await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', user.id)
  } else {
    // Like it
    await supabase.from('likes').insert({ post_id: postId, user_id: user.id })
  }

  revalidatePath('/feed')
}

export async function addComment(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const postId = formData.get('post_id') as string
  const content = formData.get('content') as string

  if (!content || content.trim() === '') return

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    author_id: user.id,
    content: content.trim()
  })

  if (error) console.error('Error creating comment:', error)

  revalidatePath(`/feed`)
}
