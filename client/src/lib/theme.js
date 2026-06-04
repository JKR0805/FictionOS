/** @param {'light'|'dark'|'sepia'|'midnight'|'system'} theme */
export function setTheme(theme) {
  try {
    if (!theme || theme === 'system') {
      document.documentElement.removeAttribute('data-theme')
      localStorage.removeItem('fos-theme')
      return
    }
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fos-theme', theme)
  } catch {
    // ignore storage errors
  }
}

export function getTheme() {
  try {
    return localStorage.getItem('fos-theme') || 'system'
  } catch {
    return 'system'
  }
}

export function applySavedTheme() {
  const theme = getTheme()
  if (theme && theme !== 'system') {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export function getReaderSize() {
  try {
    return localStorage.getItem('fos-reader-size') || 'base'
  } catch {
    return 'base'
  }
}

export function setReaderSize(size) {
  try {
    localStorage.setItem('fos-reader-size', size)
  } catch {
    // ignore
  }
}
