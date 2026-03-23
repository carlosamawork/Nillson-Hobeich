import { getSettings } from './settings'
import type { HeaderData } from '@/sanity/types'

export async function getHeader(): Promise<HeaderData> {
  const settings = await getSettings()
  return {
    headerLinks: settings.headerLinks,
  }
}
