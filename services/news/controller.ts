import { Request, Response } from 'express'
import News from './model'
import { INews } from './utils/interface'
import Categorie from '../categories/model'

export const createNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newsItem = (await News.create(req.body)) as INews

    res.status(201).json(newsItem)
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    })
  }
}

export const getAllNews = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const news = (await News.findAll({
      include: [
        {
          model: Categorie,
        },
      ],
    })) as INews[]
    res.status(200).json(news)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}

export const getLimitNews = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = parseInt(_req.params.limit)
    let options = {}

    if (!isNaN(limit) && limit > 0) {
      options = { limit }
    }

    const news = (await News.findAll({
      include: [
        {
          model: Categorie,
        },
      ],
      ...options,
    })) as INews[]
    res.status(200).json(news)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}

export const getNewBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params
  try {
    const news = await News.findOne({
      where: {
        slug,
      },
    })

    res.status(200).json(news)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
