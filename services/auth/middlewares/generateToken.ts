const jwt = require('jsonwebtoken')
/**
 * Genera un token de expiración (refresh token) con el payload especificado.
 * @param {Object} payload - Objeto que contiene los datos a incluir en el token.
 * @returns {string} - Refresh token generado.
 */
export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '30d', // 30 días
  })
}

/**
 * Obtiene la fecha de expiración en formato ISO8601 (UTC) para el token de expiración.
 * @returns {string} - Fecha de expiración en formato ISO8601 (UTC).
 */
export const getExpirationDate = (): string => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30) // 30 días a partir de la fecha actual
  return expirationDate.toISOString()
}
