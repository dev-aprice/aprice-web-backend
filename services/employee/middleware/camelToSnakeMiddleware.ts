import { NextFunction, Request, Response } from 'express'
import { snakeCase } from 'lodash'

// Función para convertir las claves de un objeto a snake_case sin utilizar funciones recursivas
const convertKeysToSnakeCase = (
  obj: Record<string, any>
): Record<string, any> => {
  const stack = [{ obj, parentKey: '' }]

  while (stack.length > 0) {
    const { obj, parentKey } = stack.pop()!

    const newObj: Record<string, any> = {}
    Object.keys(obj).forEach((key) => {
      const newKey = parentKey ? `${parentKey}_${key}` : key
      if (Array.isArray(obj[key])) {
        newObj[newKey] = obj[key].map((item: any) => ({
          item,
          parentKey: newKey,
        }))
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        stack.push({ obj: obj[key], parentKey: newKey })
      } else {
        newObj[snakeCase(newKey)] = obj[key]
      }
    })

    if (parentKey === '') {
      return newObj
    } else {
      obj[parentKey] = newObj
    }
  }

  return obj
}

// Middleware para convertir las claves del body de camelCase a snake_case
export const camelToSnakeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (req.body) {
    req.body = convertKeysToSnakeCase(req.body)
  }
  next()
}
