'use client'

import React, { useState, useRef } from 'react'
import { ImagePlus, Send, X } from 'lucide-react'
import styles from './feed.module.css'
import { createPost } from './actions'

type CreatePostFormProps = {
  avatarInitials: string
  dropdownOptions: { id: string, name: string }[]
}

export function CreatePostForm({ avatarInitials, dropdownOptions }: CreatePostFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  // We explicitly track submitting state to prevent overlapping posts during lag
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a temporary local URL to immediately preview the selected image
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    } else {
      setImagePreview(null)
    }
  }

  const clearImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Pass execution to our server action
      await createPost(formData)
      
      // On success, reset UI manually
      formRef.current?.reset()
      setImagePreview(null)
    } catch (error) {
       console.error("Failed to post:", error)
    } finally {
       setIsSubmitting(false)
    }
  }

  return (
    <div className={`${styles.createPostCard} animate-fade-in`}>
      <div className={styles.createPostHeader}>
         <div className={styles.avatar}>
             {avatarInitials}
         </div>
         <div style={{ fontWeight: 600 }}>Create a new post</div>
      </div>

      <form action={handleSubmit} ref={formRef}>
        <textarea
          name="content"
          className={styles.textarea}
          placeholder="What's happening on campus?"
          required
        ></textarea>

        {/* Instantly show the Draft Image Preview if attached */}
        {imagePreview && (
          <div className={styles.imagePreviewContainer}>
            <img src={imagePreview} alt="Draft upload preview" className={styles.previewImg} />
            <button 
              type="button" 
              onClick={clearImage}
              className={styles.clearImageBtn}
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className={styles.actions}>
          <div className={styles.controlsGroup}>
             <label className={styles.fileInputLabel}>
               <ImagePlus size={20} /> <span className={styles.hideTextMobile}>Media</span>
               <input 
                 type="file" 
                 name="image" 
                 className={styles.fileInput}
                 accept="image/*"
                 onChange={handleImageChange}
                 ref={fileInputRef}
               />
             </label>
             
             <select name="community_id" className="input-base" style={{ width: 'auto', padding: '0.4rem', fontSize: '0.85rem', flex: 1, textOverflow: 'ellipsis' }}>
               <option value="null">General Feed (Global)</option>
               {dropdownOptions.map((community) => (
                 <option key={community.id} value={community.id}>
                   {community.name}
                 </option>
               ))}
             </select>
          </div>
          
          <button type="submit" className={`btn-primary ${styles.postBtn}`} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} disabled={isSubmitting}>
            <Send size={16} /> <span className={styles.hideTextMobile}>{isSubmitting ? 'Posting...' : 'Post'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
