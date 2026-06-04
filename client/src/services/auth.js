import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export async function signInWithEmail(email, password) {
  if (!auth) {
    // Mock login
    console.log('Mock sign in:', email)
    return { uid: 'mock-1', email }
  }
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}

export async function signUpWithEmail(email, password) {
  if (!auth) {
    // Mock signup
    console.log('Mock sign up:', email)
    return { uid: 'mock-1', email }
  }
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(credential.user)
  return credential.user
}

export async function sendPasswordReset(email) {
  if (!auth) {
    console.log('Mock send password reset to:', email)
    return
  }
  await sendPasswordResetEmail(auth, email)
}

export async function signOut() {
  if (!auth) return
  await firebaseSignOut(auth)
}

export function onAuthStateChanged(callback) {
  if (!auth) {
    // Mock auth state: trigger immediately with null so the app knows it's "logged out"
    // (Or we could pass a mock user to auto-login)
    setTimeout(() => callback(null), 100)
    return () => {}
  }
  return firebaseOnAuthStateChanged(auth, callback)
}

export function getCurrentUser() {
  if (!auth) return null
  return auth.currentUser
}
