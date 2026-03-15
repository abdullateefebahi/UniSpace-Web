'use client'

import React, { useState } from 'react'
import { Heart, MessageCircle, Send } from 'lucide-react'
import styles from './feed.module.css'
import { toggleLike, addComment } from './actions'

type InteractivePostProps = {
  post: any
  currentUserId: string
  relativeTime: string
  initialHasLiked: boolean
}

export function InteractivePost({ post, currentUserId, relativeTime, initialHasLiked }: InteractivePostProps) {
  // Extract initial state from the post mapping
  const initialLikesCount = post.likes?.[0]?.count || 0
  const initialCommentsCount = post.comments_count?.[0]?.count || 0

  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [hasLiked, setHasLiked] = useState(initialHasLiked)
  const [showComments, setShowComments] = useState(false)
  
  const [isLiking, setIsLiking] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)

  // Optimistic Like Toggle
  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)

    // Optimistically update UI
    setHasLiked(!hasLiked)
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1)

    // Fire Server Action
    const formData = new FormData()
    formData.append('post_id', post.id)
    formData.append('has_liked', hasLiked.toString())
    
    await toggleLike(formData)
    setIsLiking(false)
  }

  // Handle Comment Submission
  const handleCommentSubmit = async (formData: FormData) => {
    setIsCommenting(true)
    formData.append('post_id', post.id)
    
    await addComment(formData)
    
    // Server action will revalidate, but we can optimistically bump the comment count 
    // and clear the form
    setIsCommenting(false)
    const form = document.getElementById(`commentForm-${post.id}`) as HTMLFormElement
    form?.reset()
  }

  return (
    <article className={styles.postCard}>
      <header className={styles.postHeader}>
        <div className={styles.avatar} style={{ width: 45, height: 45, fontSize: '1.4rem' }}>
          {post.profiles?.username?.charAt(0).toUpperCase()}
        </div>
        <div className={styles.postAuthorInfo}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className={styles.authorName}>
              {post.profiles?.full_name || `@${post.profiles?.username}`}
            </span>
            {post.communities?.name && (
              <span className={styles.communityTag}>
                in {post.communities.name}
              </span>
            )}
          </div>
          <div className={styles.postMeta}>
             <span>@{post.profiles?.username} • {post.profiles?.role || 'Student'}</span>
             <span>•</span>
             <span>{relativeTime}</span>
          </div>
        </div>
      </header>
      
      <p className={styles.postContent}>{post.content}</p>
      
      {post.image_url && (
        <img src={post.image_url} alt="Post Attachment" className={styles.postImage} loading="lazy" />
      )}

      {/* Interactions Bar */}
      <div className={styles.interactionBar}>
        <button 
          onClick={handleLike} 
          className={`${styles.actionBtn} ${hasLiked ? styles.liked : ''}`}
        >
          <Heart 
            size={20} 
            fill={hasLiked ? "currentColor" : "none"} 
            className={hasLiked ? styles.likeIconAnim : ''} 
          />
          <span>{likesCount}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)} 
          className={styles.actionBtn}
        >
          <MessageCircle size={20} />
          <span>{initialCommentsCount}</span>
        </button>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className={styles.commentsSection}>
          
          <div className={styles.commentList}>
            {(post.comments || []).length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                No comments yet. Be the first to reply!
              </div>
            ) : (
               post.comments.map((comment: any) => (
                 <div key={comment.id} className={styles.commentItem}>
                   <div className={styles.commentAvatar}>
                     {comment.profiles?.username?.charAt(0).toUpperCase()}
                   </div>
                   <div className={styles.commentBody}>
                     <div className={styles.commentHeader}>
                        <span className={styles.commentAuthor}>
                          {comment.profiles?.full_name || `@${comment.profiles?.username}`}
                        </span>
                     </div>
                     <div className={styles.commentContent}>
                        {comment.content}
                     </div>
                   </div>
                 </div>
               ))
            )}
          </div>

          <form id={`commentForm-${post.id}`} action={handleCommentSubmit} className={styles.commentForm}>
            <input 
              type="text" 
              name="content" 
              className={styles.commentInput} 
              placeholder="Write a comment..." 
              required
              disabled={isCommenting}
            />
            <button type="submit" className={styles.commentSubmitBtn} disabled={isCommenting}>
              <Send size={20} />
            </button>
          </form>

        </div>
      )}
    </article>
  )
}
