import seedrandom from 'seedrandom'
import { IProps as IAPIProps } from '../contexts/api'

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

export function getAvatarColor(name?: string) {
  if (!name || !name.trim()) return 'teal'
  return seedColor(name)
}

const COLORS = ['pink', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple']
export function seedColor(str?: string) {
  const mathRandom = seedrandom(str)
  const bg = COLORS[Math.floor(mathRandom() * COLORS.length)]
  return bg
}

export function resourceListSort(field = 'name'): { apiProps: Partial<IAPIProps> } {
  return {
    apiProps: {
      axiosThen: ({ data }) => {
        return data?.sort?.((a: any, b: any) => a?.[field]?.localeCompare?.(b?.[field]))
      }
    }
  }
}

export function resourceEditRelationFix(): { apiProps: Partial<IAPIProps> } {
  return {
    apiProps: {
      axiosThen: ({ data }) => {
        for (const key in data) {
          if (data[key]?.id) {
            data[key] = data[key].id
          }
        }
        return data
      }
    }
  }
}

export function hoursMinutes(minutes: number) {
  let text = ''

  if (minutes >= 60) {
    text += Math.floor(minutes / 60).toString()
    text += 'h'
  }

  if (minutes % 60 !== 0) {
    text += (minutes % 60).toString().padStart(2, '0')
    text += 'min'
  }

  return text
}

export function getName(name: string | undefined) {
  if (!name) return ''
  let splittedName = name.split(' ')
  if (splittedName[1] && splittedName[1].length <= 2) splittedName = splittedName.slice(0, 3)
  else splittedName = splittedName.slice(0, 2)
  return splittedName.join(' ')
}
