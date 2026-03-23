import type { InternationalizedText, InternationalizedBody } from '@/sanity/types/home'

export function getLocalizedText(
  arr?: InternationalizedText[],
  locale = 'en'
): string {
  if (!arr || !Array.isArray(arr)) return ''
  return arr.find((t) => t._key === locale)?.value ?? arr[0]?.value ?? ''
}

export function getLocalizedBody(
  arr?: InternationalizedBody[],
  locale = 'en'
): InternationalizedBody['value'] {
  if (!arr || !Array.isArray(arr)) return []
  const match = arr.find((t) => t._key === locale) ?? arr[0]
  return match?.value ?? []
}
