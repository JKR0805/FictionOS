import { Router } from 'express'
import { authenticate, optionalAuth } from '../middleware/authenticate.js'
import { query } from '../db/index.js'

const router = Router()

// GET /api/chapters/:id — get a specific chapter
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM chapters WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Chapter not found' })
    
    const chapter = result.rows[0]
    
    if (chapter.status === 'draft') {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized to view draft' })
      const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
      const novelResult = await query('SELECT author_id FROM novels WHERE id = $1', [chapter.novel_id])
      
      if (userResult.rows.length === 0 || novelResult.rows.length === 0 || userResult.rows[0].id !== novelResult.rows[0].author_id) {
        return res.status(401).json({ error: 'Unauthorized to view draft' })
      }
    }
    
    res.json({
      id: chapter.id,
      novelId: chapter.novel_id,
      number: chapter.number,
      title: chapter.title,
      content: chapter.content,
      status: chapter.status,
      publishedAt: chapter.published_at,
      wordCount: chapter.word_count,
      createdAt: chapter.created_at
    })
  } catch (err) {
    console.error('Error fetching chapter:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// PATCH /api/chapters/:id — update a chapter (auth required)
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const { title, content, status } = req.body
    
    // Verify author
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const chapResult = await query(`
      SELECT n.author_id 
      FROM chapters c 
      JOIN novels n ON c.novel_id = n.id 
      WHERE c.id = $1
    `, [req.params.id])
    
    if (chapResult.rows.length === 0) return res.status(404).json({ error: 'Chapter not found' })
    if (chapResult.rows[0].author_id !== authorId) return res.status(403).json({ error: 'Forbidden' })
    
    const wordCount = content ? content.split(/\s+/).length : 0
    
    const result = await query(`
      UPDATE chapters 
      SET 
        title = COALESCE($1, title),
        content = COALESCE($2, content),
        word_count = COALESCE($3, word_count),
        status = COALESCE($4, status)
      WHERE id = $5
      RETURNING *
    `, [title, content, wordCount, status, req.params.id])
    
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error updating chapter:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// POST /api/chapters/:id/publish — publish a chapter (auth required)
router.post('/:id/publish', authenticate, async (req, res) => {
  try {
    // Verify author
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const chapResult = await query(`
      SELECT n.author_id 
      FROM chapters c 
      JOIN novels n ON c.novel_id = n.id 
      WHERE c.id = $1
    `, [req.params.id])
    
    if (chapResult.rows.length === 0) return res.status(404).json({ error: 'Chapter not found' })
    if (chapResult.rows[0].author_id !== authorId) return res.status(403).json({ error: 'Forbidden' })
    
    const result = await query(`
      UPDATE chapters 
      SET status = 'published', published_at = NOW() 
      WHERE id = $1
      RETURNING *
    `, [req.params.id])
    
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error publishing chapter:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// DELETE /api/chapters/:id — delete a chapter (auth required)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Verify author
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const chapResult = await query(`
      SELECT n.author_id 
      FROM chapters c 
      JOIN novels n ON c.novel_id = n.id 
      WHERE c.id = $1
    `, [req.params.id])
    
    if (chapResult.rows.length === 0) return res.status(404).json({ error: 'Chapter not found' })
    if (chapResult.rows[0].author_id !== authorId) return res.status(403).json({ error: 'Forbidden' })
    
    await query('DELETE FROM chapters WHERE id = $1', [req.params.id])
    
    res.json({ message: 'Chapter deleted', id: req.params.id })
  } catch (err) {
    console.error('Error deleting chapter:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

export default router
