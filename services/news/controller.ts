import { Request, Response } from 'express'
import News from './model'
import { INews } from './utils/interface'
import Categorie from '../categories/model'

// export const createNews = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const newsItem = (await News.create(req.body)) as INews

//     res.status(201).json(newsItem)
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error instanceof Error ? error.message : 'An unexpected error occurred',
//     })
//   }
// }

export const createNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let newsItem: INews | null
    // Si la solicitud incluye un ID, intenta actualizar la noticia
    if (req.body.id) {
      // Actualizar noticia
      const existingNews = await News.findByPk(req.body.id)
      if (existingNews) {
        existingNews.set(req.body)
        newsItem = await existingNews.save()
      } else {
        newsItem = null
      }
    } else {
      // Crear una nueva noticia
      newsItem = (await News.create(req.body)) as INews
    }

    if (newsItem) {
      res.status(200).json(newsItem)
    } else {
      res.status(404).json({ message: 'Noticia no encontrada' })
    }
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Ocurrió un error inesperado',
    })
  }
}

// export const updateNews = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     console.log(11111111)
//     const { id } = req.params // Obtiene el ID de la noticia desde los parámetros de la URL
//     const updateData = req.body // Obtiene los datos a actualizar desde el cuerpo de la solicitud
//     // Busca y actualiza la noticia correspondiente al ID proporcionado
//     const [numberOfAffectedRows, [updatedNewsItem]] = await News.update(
//       updateData,
//       {
//         where: { id: id },
//         returning: true, // Esta opción no está soportada por todos los dialectos SQL en Sequelize
//       }
//     )

//     if (numberOfAffectedRows === 0) {
//       // Si no se encontró la noticia o no se actualizó, envía un 404
//       return res.status(404).json({ message: 'News item not found' })
//     }

//     // Envía la noticia actualizada como respuesta
//     res.status(200).json(updatedNewsItem)
//   } catch (error: any) {
//     console.log(error)
//     // Maneja cualquier error que pueda ocurrir durante la actualización
//     res.status(500).json({
//       message: error.message || 'An unexpected error occurred',
//     })
//   }
// }

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

export const deleteNew = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params

    await News.destroy({
      where: { slug: slug },
    })

    res.status(200).json({ msg: 'Se ha eliminado la noticia correctamente' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message })
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
