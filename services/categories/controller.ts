import { Request, Response } from 'express'
import Categorie from './model'
import { ICategoryInstance } from './interface'

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCategory = (await Categorie.create(req.body)) as ICategoryInstance

    res.status(201).json(newCategory)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      })
    } else {
      res.status(500).json({
        msg: 'An unexpected error occurred',
      })
    }
  }
}

export const getAllCategories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = (await Categorie.findAll()) as ICategoryInstance[]

    res.status(201).json(categories)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      })
    } else {
      res.status(500).json({
        msg: 'An unexpected error occurred',
      })
    }
  }
}
