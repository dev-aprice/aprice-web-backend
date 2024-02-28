import { Request, Response } from 'express'
import Role from './model'

export const getAllRoles = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const roles = await Role.findAll()

    res.status(200).json(roles)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
