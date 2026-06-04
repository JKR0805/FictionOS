import { Router } from 'express'
import { authenticate, optionalAuth } from '../middleware/authenticate.js'
import { query } from '../db/index.js'

const router = Router()

// GET /api/novels — list novels (with optional filters)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { genre, status, search, authorId } = req.query
    let sql = 'SELECT n.*, u.display_name as author_name, (SELECT COUNT(*)::int FROM chapters c WHERE c.novel_id = n.id AND c.status = \'published\') as chapter_count FROM novels n JOIN users u ON n.author_id = u.id WHERE 1=1'
    const values = []
    let paramIdx = 1

    if (genre && genre !== 'All') {
      sql += ` AND $${paramIdx} = ANY(n.genre)`
      values.push(genre)
      paramIdx++
    }
    if (status) {
      sql += ` AND n.status = $${paramIdx}`
      values.push(status)
      paramIdx++
    }
    if (search) {
      sql += ` AND (n.title ILIKE $${paramIdx} OR n.synopsis ILIKE $${paramIdx})`
      values.push(`%${search}%`)
      paramIdx++
    }
    if (authorId) {
      sql += ` AND n.author_id = $${paramIdx}`
      values.push(authorId)
      paramIdx++
    }
    
    sql += ' ORDER BY n.created_at DESC'
    
    const result = await query(sql, values)
    
    // Map snake_case to camelCase
    const novels = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      synopsis: row.synopsis,
      status: row.status,
      genre: row.genre,
      tags: row.tags,
      authorId: row.author_id,
      authorName: row.author_name,
      totalReads: row.total_reads,
      followersCount: parseInt(row.followers_count, 10) || 0,
      completionRate: parseInt(row.completion_rate, 10) || 0,
      createdAt: row.created_at,
      chapterCount: parseInt(row.chapter_count, 10) || 0,
      coverUrl: row.cover_url
    }))
    
    res.json(novels)
  } catch (err) {
    console.error('Error fetching novels:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// GET /api/novels/following — list followed novels
router.get('/following', authenticate, async (req, res) => {
  try {
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const userId = userResult.rows[0].id
    
    const result = await query(`
      SELECT n.*, u.display_name as author_name, 
             (SELECT COUNT(*)::int FROM chapters c WHERE c.novel_id = n.id AND c.status = 'published') as chapter_count,
             rp.chapter_number as last_read_chapter, rp.chapter_id as last_read_chapter_id
      FROM novels n 
      JOIN users u ON n.author_id = u.id 
      JOIN novel_followers nf ON nf.novel_id = n.id
      LEFT JOIN reading_progress rp ON rp.novel_id = n.id AND rp.user_id = nf.user_id
      WHERE nf.user_id = $1
      ORDER BY rp.updated_at DESC NULLS LAST, nf.created_at DESC
    `, [userId])
    
    const novels = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      synopsis: row.synopsis,
      status: row.status,
      genre: row.genre,
      tags: row.tags,
      authorId: row.author_id,
      authorName: row.author_name,
      totalReads: row.total_reads,
      followersCount: parseInt(row.followers_count, 10) || 0,
      completionRate: parseInt(row.completion_rate, 10) || 0,
      createdAt: row.created_at,
      chapterCount: parseInt(row.chapter_count, 10) || 0,
      coverUrl: row.cover_url,
      lastReadChapter: parseInt(row.last_read_chapter, 10) || null,
      lastReadChapterId: row.last_read_chapter_id
    }))
    
    res.json(novels)
  } catch (err) {
    console.error('Error fetching followed novels:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// GET /api/novels/:id — single novel
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    let sql = 'SELECT n.*, u.display_name as author_name, (SELECT COUNT(*)::int FROM chapters c WHERE c.novel_id = n.id AND c.status = \'published\') as chapter_count FROM novels n JOIN users u ON n.author_id = u.id WHERE n.id = $1'
    let values = [req.params.id]

    let userId = null
    if (req.user) {
      const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
      if (userResult.rows.length > 0) userId = userResult.rows[0].id
    }

    if (userId) {
      sql = `
        SELECT n.*, u.display_name as author_name, 
               (SELECT COUNT(*)::int FROM chapters c WHERE c.novel_id = n.id AND c.status = 'published') as chapter_count,
               rp.chapter_number as last_read_chapter,
               EXISTS(SELECT 1 FROM novel_followers nf WHERE nf.novel_id = n.id AND nf.user_id = $2) as is_following
        FROM novels n 
        JOIN users u ON n.author_id = u.id 
        LEFT JOIN reading_progress rp ON rp.novel_id = n.id AND rp.user_id = $2
        WHERE n.id = $1
      `
      values.push(userId)
    }

    const result = await query(sql, values)
    if (result.rows.length === 0) return res.status(404).json({ error: 'Novel not found' })
    
    const row = result.rows[0]
    res.json({
      id: row.id,
      title: row.title,
      synopsis: row.synopsis,
      status: row.status,
      genre: row.genre,
      tags: row.tags,
      authorId: row.author_id,
      authorName: row.author_name,
      totalViews: row.total_views,
      totalReads: row.total_reads,
      followersCount: parseInt(row.followers_count, 10) || 0,
      completionRate: parseInt(row.completion_rate, 10) || 0,
      createdAt: row.created_at,
      chapterCount: parseInt(row.chapter_count, 10) || 0,
      coverUrl: row.cover_url,
      lastReadChapter: parseInt(row.last_read_chapter, 10) || null,
      isFollowing: row.is_following || false
    })
  } catch (err) {
    console.error('Error fetching novel:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// POST /api/novels — create novel (auth required)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, synopsis, genre, tags } = req.body
    
    // Get user id from firebase_uid
    const userResult = await query('SELECT id, display_name FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found in DB' })
    const authorId = userResult.rows[0].id
    
    const result = await query(`
      INSERT INTO novels (title, synopsis, genre, tags, author_id)
      VALUES ($1, $2, $3::text[], $4::text[], $5)
      RETURNING *
    `, [title, synopsis, genre || [], tags || [], authorId])
    
    const row = result.rows[0]
    res.status(201).json({
      id: row.id,
      title: row.title,
      synopsis: row.synopsis,
      status: row.status,
      genre: row.genre,
      tags: row.tags,
      authorId: row.author_id,
      authorName: userResult.rows[0].display_name,
      createdAt: row.created_at
    })
  } catch (err) {
    console.error('Error creating novel:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// PATCH /api/novels/:id — update novel
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const { title, synopsis, status, genre, tags, coverUrl } = req.body
    
    // Verify author
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const novelResult = await query('SELECT author_id FROM novels WHERE id = $1', [req.params.id])
    if (novelResult.rows.length === 0) return res.status(404).json({ error: 'Novel not found' })
    if (novelResult.rows[0].author_id !== authorId) return res.status(403).json({ error: 'Forbidden' })
    
    const result = await query(
      `UPDATE novels 
       SET title = COALESCE($1, title), 
           synopsis = COALESCE($2, synopsis), 
           status = COALESCE($3, status),
           genre = COALESCE($4::text[], genre),
           tags = COALESCE($5::text[], tags),
           cover_url = COALESCE($6, cover_url)
       WHERE id = $7 RETURNING *`,
      [title, synopsis, status, genre, tags, coverUrl, req.params.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error updating novel:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// DELETE /api/novels/:id — delete novel
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Verify author
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const result = await query('DELETE FROM novels WHERE id = $1 AND author_id = $2 RETURNING id', [req.params.id, authorId])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Novel not found or unauthorized' })
    
    res.json({ message: 'Novel deleted', id: req.params.id })
  } catch (err) {
    console.error('Error deleting novel:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// GET /api/novels/:id/chapters
router.get('/:id/chapters', optionalAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM chapters WHERE novel_id = $1 ORDER BY number ASC', [req.params.id])
    
    const chapters = result.rows.map(row => ({
      id: row.id,
      novelId: row.novel_id,
      number: row.number,
      title: row.title,
      status: row.status,
      publishedAt: row.published_at,
      wordCount: row.word_count,
      createdAt: row.created_at
    }))
    
    res.json(chapters)
  } catch (err) {
    console.error('Error fetching chapters:', err)
    res.status(500).json({ error: 'Database error' })
  }
})



// POST /api/novels/:id/chapters — create chapter
router.post('/:id/chapters', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body
    const novelId = req.params.id
    
    // Verify author
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const novelResult = await query('SELECT author_id FROM novels WHERE id = $1', [novelId])
    if (novelResult.rows.length === 0) return res.status(404).json({ error: 'Novel not found' })
    if (novelResult.rows[0].author_id !== authorId) return res.status(403).json({ error: 'Forbidden' })
    
    // Get next chapter number
    const numResult = await query('SELECT COALESCE(MAX(number), 0) + 1 as next_num FROM chapters WHERE novel_id = $1', [novelId])
    const nextNum = numResult.rows[0].next_num
    
    const result = await query(`
      INSERT INTO chapters (novel_id, number, title, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [novelId, nextNum, title, content || ''])
    
    const row = result.rows[0]
    res.status(201).json({
      id: row.id,
      novelId: row.novel_id,
      number: row.number,
      title: row.title,
      status: row.status,
      publishedAt: row.published_at,
      wordCount: row.word_count,
      createdAt: row.created_at
    })
  } catch (err) {
    console.error('Error creating chapter:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// POST /api/novels/:id/follow — follow/unfollow a novel
router.post('/:id/follow', authenticate, async (req, res) => {
  try {
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const userId = userResult.rows[0].id
    
    // Check if already following
    const checkResult = await query('SELECT * FROM novel_followers WHERE user_id = $1 AND novel_id = $2', [userId, req.params.id])
    
    if (checkResult.rows.length > 0) {
      // Unfollow
      await query('DELETE FROM novel_followers WHERE user_id = $1 AND novel_id = $2', [userId, req.params.id])
      await query('UPDATE novels SET followers_count = followers_count - 1 WHERE id = $1', [req.params.id])
      res.json({ following: false })
    } else {
      // Follow
      await query('INSERT INTO novel_followers (user_id, novel_id) VALUES ($1, $2)', [userId, req.params.id])
      await query('UPDATE novels SET followers_count = followers_count + 1 WHERE id = $1', [req.params.id])
      res.json({ following: true })
    }
  } catch (err) {
    console.error('Error toggling follow:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// POST /api/novels/:id/read — mark chapter as read
router.post('/:id/read', authenticate, async (req, res) => {
  try {
    const { chapterId } = req.body
    if (!chapterId) return res.status(400).json({ error: 'chapterId is required' })

    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const userId = userResult.rows[0].id

    // Fetch chapter to verify it belongs to novel and get number/title
    const chapterResult = await query('SELECT number, title FROM chapters WHERE id = $1 AND novel_id = $2', [chapterId, req.params.id])
    if (chapterResult.rows.length === 0) return res.status(404).json({ error: 'Chapter not found' })
    
    const { number, title } = chapterResult.rows[0]

    // Fetch existing progress to ensure we don't downgrade the highest chapter read
    const progressResult = await query('SELECT chapter_number FROM reading_progress WHERE user_id = $1 AND novel_id = $2', [userId, req.params.id])
    const currentMax = progressResult.rows.length > 0 ? progressResult.rows[0].chapter_number : 0

    // Only UPSERT if this chapter number is higher than or equal to the current one, or if no progress exists.
    // Actually, even if it's lower, we might want to update the `updated_at` so it bumps in the library.
    // Wait, if they re-read chapter 1, do we reset their `lastReadChapter` to 1?
    // The user requested: "use it to track progress", usually we track the highest chapter, but "recently read" requires updated_at.
    // Let's just update `updated_at` and ONLY update `chapter_number` if it's >= the current max.
    
    if (currentMax > 0 && number < currentMax) {
      // Just bump the updated_at
      await query(`
        UPDATE reading_progress SET updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND novel_id = $2
      `, [userId, req.params.id])
    } else {
      // Upsert the new highest chapter
      await query(`
        INSERT INTO reading_progress (user_id, novel_id, chapter_id, chapter_number, chapter_title, updated_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id, novel_id) 
        DO UPDATE SET 
          chapter_id = EXCLUDED.chapter_id,
          chapter_number = EXCLUDED.chapter_number,
          chapter_title = EXCLUDED.chapter_title,
          updated_at = CURRENT_TIMESTAMP
      `, [userId, req.params.id, chapterId, number, title])
    }

    // Also increment total reads on the novel if this is their very first chapter ever read, or just increment chapters_read on user?
    // We'll leave stats alone for now, just track progress.
    
    res.json({ success: true, chapterNumber: number })
  } catch (err) {
    console.error('Error marking as read:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// PATCH /api/novels/:id/chapters/reorder — reorder chapters
router.patch('/:id/chapters/reorder', authenticate, async (req, res) => {
  try {
    const { chapterIds } = req.body // array of chapter IDs in new order
    if (!Array.isArray(chapterIds)) return res.status(400).json({ error: 'Invalid payload' })
    
    const userResult = await query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid])
    if (userResult.rows.length === 0) return res.status(401).json({ error: 'User not found' })
    const authorId = userResult.rows[0].id
    
    const novelResult = await query('SELECT author_id FROM novels WHERE id = $1', [req.params.id])
    if (novelResult.rows.length === 0) return res.status(404).json({ error: 'Novel not found' })
    if (novelResult.rows[0].author_id !== authorId) return res.status(403).json({ error: 'Forbidden' })
    
    // Use transaction for bulk update
    await query('BEGIN')
    try {
      for (let i = 0; i < chapterIds.length; i++) {
        await query('UPDATE chapters SET number = $1 WHERE id = $2 AND novel_id = $3', [i + 1, chapterIds[i], req.params.id])
      }
      await query('COMMIT')
      res.json({ message: 'Chapters reordered successfully' })
    } catch (err) {
      await query('ROLLBACK')
      throw err
    }
  } catch (err) {
    console.error('Error reordering chapters:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

export default router
