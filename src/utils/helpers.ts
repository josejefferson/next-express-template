export function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()!.split(';').shift()
}

export function getTimeSaudation() {
  const hours = new Date().getHours()
  if (hours <= 4) return 'Boa noite'
  if (hours >= 18) return 'Boa noite'
  if (hours >= 12) return 'Boa tarde'
  return 'Bom dia'
}

export function getLoginURL() {
  const pathname = location.pathname
  const query = location.search ? location.search : ''
  const hash = location.hash ? location.hash : ''
  return '/login?continue=' + encodeURIComponent(pathname + query + hash)
}

const COLORS = ['pink', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple']
export function getAvatarColor(name?: string) {
  if (!name || !name.trim()) return 'teal'
  const i = name.trim().toLowerCase().charCodeAt(0) % COLORS.length
  return COLORS[i]
}
