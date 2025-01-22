import { ApiContract } from '../types'

export function validateApiResponse(data: unknown): data is ApiContract {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  return Object.values(data).every(
    (items) =>
      typeof items === 'object' &&
      items !== null &&
      Object.values(items).every(
        (details) =>
          typeof details === 'object' &&
          details !== null &&
          'rate' in details &&
          'ask' in details &&
          'bid' in details &&
          'diff24h' in details
      )
  )
}
