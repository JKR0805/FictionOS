import pkg from 'pg'
const { Pool } = pkg
import 'dotenv/config'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const query = (text, params) => pool.query(text, params)

export const initDB = async () => {
  console.log('Initializing database tables...')
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        firebase_uid VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        display_name VARCHAR(255),
        bio TEXT,
        chapters_read INTEGER DEFAULT 0,
        reading_streak INTEGER DEFAULT 0,
        reading_time_hours INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS novels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        synopsis TEXT,
        status VARCHAR(50) DEFAULT 'ongoing',
        genre TEXT[],
        tags TEXT[],
        author_id UUID REFERENCES users(id) ON DELETE CASCADE,
        author_name VARCHAR(255),
        total_views INTEGER DEFAULT 0,
        total_reads INTEGER DEFAULT 0,
        followers_count INTEGER DEFAULT 0,
        completion_rate INTEGER DEFAULT 0,
        cover_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE novels ADD COLUMN IF NOT EXISTS cover_url TEXT;

      CREATE TABLE IF NOT EXISTS chapters (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        number INTEGER,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        status VARCHAR(50) DEFAULT 'draft',
        published_at TIMESTAMP,
        word_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reading_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
        chapter_number INTEGER,
        chapter_title VARCHAR(255),
        progress_percent INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, novel_id)
      );

      CREATE TABLE IF NOT EXISTS novel_followers (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, novel_id)
      );

      CREATE TABLE IF NOT EXISTS chapter_versions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
        author_id UUID REFERENCES users(id),
        commit_message TEXT,
        content_snapshot TEXT,
        word_count INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        chapter_id UUID REFERENCES chapters(id),
        position INTEGER,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
        author_id UUID REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        reviewer_id UUID REFERENCES users(id),
        rating INTEGER CHECK (rating BETWEEN 1 AND 5),
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (novel_id, reviewer_id)
      );

      CREATE TABLE IF NOT EXISTS follows (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        follower_id UUID NOT NULL,
        followee_id UUID,
        novel_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK (
          (followee_id IS NOT NULL AND novel_id IS NULL) OR 
          (followee_id IS NULL AND novel_id IS NOT NULL)
        )
      );

      CREATE TABLE IF NOT EXISTS novel_analytics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID UNIQUE,
        total_views BIGINT DEFAULT 0,
        total_reads BIGINT DEFAULT 0,
        followers_count INTEGER DEFAULT 0,
        completion_rate NUMERIC(5,2)
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        type TEXT NOT NULL,
        payload JSONB,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS characters (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        traits JSONB,
        first_appearance_chapter_id UUID REFERENCES chapters(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS locations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS timeline_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        chapter_id UUID REFERENCES chapters(id),
        title TEXT,
        description TEXT,
        story_date TEXT,
        characters_involved UUID[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS relationships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        character_a UUID REFERENCES characters(id),
        character_b UUID REFERENCES characters(id),
        relationship_type TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS codex_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        category TEXT CHECK (category IN ('character', 'location', 'organization', 'artifact', 'lore')),
        title TEXT NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS consistency_reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
        issue_type TEXT,
        description TEXT,
        chapter_ids UUID[],
        status TEXT CHECK (status IN ('open', 'resolved', 'dismissed')) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('Database tables initialized successfully.')
  } catch (err) {
    console.error('Error initializing database tables:', err)
  } finally {
    client.release()
  }
}
