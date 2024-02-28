import { Request, Response } from 'express'
import Service from './model'
import SubService from '../subservices/model'
import SubServiceDetail from '../subservice-details/model'
import Client from '../clients/model'
import { createSubService } from '../subservices/controller'
import { IServices } from './interface'
import { Model } from 'sequelize'

interface IServiceModel extends Model {
  id: number
}

export const createService = async (req: Request, res: Response) => {
  const { name, resume, description, slug, id_client, subservices }: IServices =
    req.body

  try {
    const service = (await Service.create({
      name,
      resume,
      description,
      slug,
      id_client,
    })) as IServiceModel

    if (subservices && subservices.length > 0) {
      for (const subservice of subservices) {
        await createSubService({
          ...subservice,
          id_services: service.id,
        })
      }
    }

    return res.status(201).json({
      msg: 'Se ha creado el nuevo servicio correctamente',
      service,
    })
  } catch (error: any) {
    console.error('Error creating service:', error.message)
    return res.status(500).json({ error: error.message })
  }
}

export const getAllServices = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const services = await Service.findAll({
      include: [Client],
    })

    res.status(200).json(services)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
export const getServiceBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params
  try {
    const service = await Service.findOne({
      where: {
        slug,
      },
      include: [
        {
          model: SubService,
          include: [
            {
              model: SubServiceDetail,
            },
          ],
        },
      ],
    })

    res.status(200).json(service)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
