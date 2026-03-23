/**
 * Extrae el valor del idioma correcto de un campo internacionalizado.
 *
 * En sanity-plugin-internationalized-array v3, los datos se almacenan como:
 *   [{ _key: "en", value: "hello" }, { _key: "es", value: "hola" }]
 *
 * Por lo tanto, el filtro GROQ usa `_key` (no `language`).
 *
 * Uso en GROQ:
 *   title[_key == $locale][0].value
 *
 * Uso en código TypeScript:
 *   localizedField('title')  // → 'title[_key == $locale][0].value'
 */
export function localizedField(fieldName: string): string {
  return `${fieldName}[_key == $locale][0].value`
}

/**
 * Igual que localizedField pero con fallback al idioma por defecto (inglés).
 *
 * Uso en GROQ:
 *   coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value)
 */
export function localizedFieldWithFallback(fieldName: string, fallbackLocale = 'en'): string {
  return `coalesce(${localizedField(fieldName)}, ${fieldName}[_key == "${fallbackLocale}"][0].value)`
}
