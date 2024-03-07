import { Request, Response } from 'express'
import Service from './model'
import SubService from '../subservices/model'
import SubServiceDetail from '../subservice-details/model'
import {
  ISubServiceModel,
  createSubService,
  updateSubservices,
} from '../subservices/controller'
import { IServices } from './interface'
import { Model } from 'sequelize'
import Partner from '../partners/model'

interface IServiceModel extends Model {
  id: number
}

export const createService = async (req: Request, res: Response) => {
  const {
    name,
    resume,
    description,
    slug,
    id_partner,
    subservices,
  }: IServices = req.body

  try {
    const service = (await Service.create({
      name,
      resume,
      description,
      slug,
      id_partner,
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
      include: [
        {
          model: Partner,
        },
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
          model: Partner,
        },
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

export const updateService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, name, resume, description, slug, id_client, subservices } =
    req.body

  try {
    let existingService = await Service.findByPk(id)

    if (!existingService) {
      res.status(404).json({ error: 'Servicio no encontrado' })
      return
    }

    await existingService.update({ name, resume, description, slug, id_client })

    if (subservices && subservices.length > 0) {
      for (const subservice of subservices) {
        await updateSubservices(subservice, id)
      }
    }

    const updatedService = await Service.findOne({
      where: { id },
      include: [
        {
          model: SubService,
          as: 'subservices',
          include: [
            {
              model: SubServiceDetail,
              as: 'subservice_details',
            },
          ],
        },
      ],
    })

    res.status(200).json({
      msg: 'Servicio actualizado correctamente',
      service: updatedService,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error' })
  }
}
export const deleteServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params

    // Find Services by slug
    const service = (await Service.findOne({
      where: { slug: slug },
    })) as IServiceModel

    if (service) {
      // Find all SubServices associated with the Service
      const subServices = (await SubService.findAll({
        where: { id_services: service.id },
      })) as ISubServiceModel[]

      // For each SubService, find and delete all associated SubServiceDetails
      for (const subService of subServices) {
        await SubServiceDetail.destroy({
          where: { id_subservice: subService.id },
        })
      }

      // After deleting SubServiceDetails, delete all SubServices associated with the Service
      await SubService.destroy({
        where: { id_services: service.id },
      })

      // Finally, delete the Service itself
      await service.destroy()
    }

    res.status(200).json({
      msg: 'El servicio y sus dependencias han sido eliminados correctamente',
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message })
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
