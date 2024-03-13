import { Request, Response } from 'express'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import User from './model'
import {
  generateRefreshToken,
  getExpirationDate,
} from './middlewares/generateToken'
import { UserAttributes } from './interface'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // Buscar al usuario
    const user = (await User.findOne({
      where: {
        email,
      },
    })) as unknown as UserAttributes

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: 'Contraseña o usuario incorrecto',
      })
    }

    // Comparar contraseñas (Se asume que la contraseña almacenada está hasheada)
    bcrypt.compare(password, user.password, async (err, isPasswordValid) => {
      if (err || !isPasswordValid) {
        return res.status(401).json({
          success: false,
          msg: 'Contraseña o usuario incorrecto',
        })
      }

      // Usuario existe y contraseña correcta
      const { id, name, email } = user // Destructure id, name, and email from user
      const refreshToken = generateRefreshToken({ id, name, email })

      // Guardar el token de actualización en la base de datos
      await User.update(
        {
          token: refreshToken,
          token_expire: getExpirationDate(),
        },
        {
          where: {
            email,
          },
        }
      )

      const token = jwt.sign(
        {
          id,
          name,
          email,
        },
        process.env.SECRETKEYTOKEN as string,
        {
          expiresIn: '720h',
        }
      )

      return res.status(200).json({
        success: true,
        msg: 'Se ha iniciado sesión con éxito',
        token,
        user: { id, name, email },
        refreshToken,
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Ha ocurrido un error al iniciar sesión',
    })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body)

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    })
  }
}
