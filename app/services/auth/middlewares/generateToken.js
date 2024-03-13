"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpirationDate = exports.generateRefreshToken = void 0;
const jwt = require('jsonwebtoken');
/**
 * Genera un token de expiración (refresh token) con el payload especificado.
 * @param {Object} payload - Objeto que contiene los datos a incluir en el token.
 * @returns {string} - Refresh token generado.
 */
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d', // 30 días
    });
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Obtiene la fecha de expiración en formato ISO8601 (UTC) para el token de expiración.
 * @returns {string} - Fecha de expiración en formato ISO8601 (UTC).
 */
const getExpirationDate = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // 30 días a partir de la fecha actual
    return expirationDate.toISOString();
};
exports.getExpirationDate = getExpirationDate;
