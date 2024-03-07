"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnakeMiddleware = void 0;
const lodash_1 = require("lodash");
// Función para convertir las claves de un objeto a snake_case sin utilizar funciones recursivas
const convertKeysToSnakeCase = (obj) => {
    const stack = [{ obj, parentKey: '' }];
    while (stack.length > 0) {
        const { obj, parentKey } = stack.pop();
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            const newKey = parentKey ? `${parentKey}_${key}` : key;
            if (Array.isArray(obj[key])) {
                newObj[newKey] = obj[key].map((item) => ({
                    item,
                    parentKey: newKey,
                }));
            }
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                stack.push({ obj: obj[key], parentKey: newKey });
            }
            else {
                newObj[(0, lodash_1.snakeCase)(newKey)] = obj[key];
            }
        });
        if (parentKey === '') {
            return newObj;
        }
        else {
            obj[parentKey] = newObj;
        }
    }
    return obj;
};
// Middleware para convertir las claves del body de camelCase a snake_case
const camelToSnakeMiddleware = (req, _res, next) => {
    if (req.body) {
        req.body = convertKeysToSnakeCase(req.body);
    }
    next();
};
exports.camelToSnakeMiddleware = camelToSnakeMiddleware;
