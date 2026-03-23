/**
 * Tipo TypeScript para un campo internacionalizado generado por
 * sanity-plugin-internationalized-array v3.
 *
 * Estructura de datos en Sanity:
 *   [{ _key: "en", value: "hello" }, { _key: "es", value: "hola" }]
 *
 * Nota: en v3 del plugin, el identificador de idioma se almacena
 * en `_key` (no en un campo `language` separado como en v4+).
 */
export type InternationalizedString = Array<{
  _key: 'en' | 'es' | 'ca' | 'sv'
  value: string
}>

/**
 * Tipo para texto multilínea internacionalizado (type: 'text' en Sanity).
 * Idéntico a InternationalizedString en estructura, diferente semánticamente.
 */
export type InternationalizedText = Array<{
  _key: 'en' | 'es' | 'ca' | 'sv'
  value: string
}>
