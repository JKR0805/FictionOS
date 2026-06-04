import { Router } from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { query } from '../db/index.js'

const router = Router()

// GET /api/users/me — get current user profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const { uid, email, name } = req.user
    
    // Upsert user based on firebase_uid
    const result = await query(`
      INSERT INTO users (firebase_uid, email, display_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (firebase_uid) 
      DO UPDATE SET email = EXCLUDED.email
      RETURNING *
    `, [uid, email, name || email.split('@')[0]])

    const user = result.rows[0]
    res.json({
      id: user.id,
      firebase_uid: user.firebase_uid,
      email: user.email,
      displayName: user.display_name,
      bio: user.bio,
      chaptersRead: user.chapters_read,
      readingStreak: user.reading_streak,
      readingTimeHours: user.reading_time_hours,
    })
  } catch (err) {
    console.error('Error fetching/creating user:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// PATCH /api/users/me — update profile
router.patch('/me', authenticate, async (req, res) => {
  try {
    const { display_name, bio } = req.body
    const result = await query(`
      UPDATE users 
      SET display_name = COALESCE($1, display_name), bio = COALESCE($2, bio)
      WHERE firebase_uid = $3
      RETURNING *
    `, [display_name, bio, req.user.uid])

    res.json({ message: 'Profile updated', user: result.rows[0] })
  } catch (err) {
    console.error('Error updating user:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// GET /api/users/:id — public profile (using UUID now)
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
    const user = result.rows[0]
    if (!user) return res.status(404).json({ error: 'User not found' })
    
    // Also fetch their novels count or followers count if needed,
    // but for now just return the user profile.
    res.json({
      id: user.id,
      displayName: user.display_name,
      bio: user.bio,
      chaptersRead: user.chapters_read,
    })
  } catch (err) {
    console.error('Error fetching user:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

export default router
