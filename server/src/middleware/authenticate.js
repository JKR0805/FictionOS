import admin from 'firebase-admin'

let firebaseInitialized = false

try {
  if (!admin.apps.length && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PROJECT_ID !== 'your-firebase-project-id') {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
    firebaseInitialized = true
  }
} catch (e) {
  console.warn('Firebase init failed. Auth will be mocked.', e.message)
}

/**
 * Middleware: verify Firebase JWT and attach decoded user to req.user
 */
export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.slice(7)
  if (!firebaseInitialized) {
    // Mock user for local development
    req.user = { uid: 'mock-user-123', email: 'mock@example.com', name: 'Mock User' }
    return next()
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

/**
 * Middleware: same as authenticate but continues on failure (for optional auth)
 */
export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    req.user = null
    return next()
  }

  const token = authHeader.slice(7)
  if (!firebaseInitialized) {
    req.user = { uid: 'mock-user-123', email: 'mock@example.com', name: 'Mock User' }
    return next()
  }

  try {
    req.user = await admin.auth().verifyIdToken(token)
  } catch {
    req.user = null
  }
  next()
}
