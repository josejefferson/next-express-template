export const permissions = [
  { ids: ['*'], description: 'ACESSO COMPLETO AOS SISTEMAS' },
  { ids: ['*.users.read'], description: 'Ver todos os usuários' },
  { ids: ['*.users'], description: 'Acesso total aos usuários' }
]

/**
 * Retorna true se o usuário tem pelo menos uma das permissões requeridas
 */
export function can(userPermissions: string[], requestedPermissions: string[]) {
  userPermissions = userPermissions.filter((p) => p.startsWith('*'))

  for (const perm of requestedPermissions) {
    for (const permission of userPermissions) {
      if (permission === perm) return true
      if (startsWith(perm, permission)) return true
    }
  }
  return false
}

function startsWith(aStr: string, bStr: string) {
  const a = aStr.toLowerCase().split('.')
  const b = bStr.toLowerCase().split('.')
  for (let i = 0; i < b.length; i++) {
    if (a[i]?.trim() === '') continue
    if (b[i]?.trim() === '') continue
    if (a[i]?.trim() === '*') continue
    if (b[i]?.trim() === '*') continue
    if (a[i]?.trim() !== b[i].trim()) return false
  }
  return true
}
