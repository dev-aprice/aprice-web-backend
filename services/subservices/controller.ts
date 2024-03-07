import SubService from './model'
import {
  createSubServiceDetail,
  updateDetailSubservices,
} from '../subservice-details/controller'
import { ISubservice } from './interface'
import { CreationOptional, Model } from 'sequelize'
import { ISubserviceDetail } from '../subservice-details/interface'

export interface ISubServiceModel extends Model {
  id: CreationOptional<number> // Hace que 'id' sea opcional en creación pero disponible después.
}

export const createSubService = async (subservicesData: ISubservice) => {
  const { subservice_details, ...subserviceData } = subservicesData

  const subService: ISubServiceModel = (await SubService.create(
    subserviceData
  )) as ISubServiceModel

  if (subservice_details && subservice_details.length > 0) {
    for (const detail of subservice_details) {
      await createSubServiceDetail({ ...detail, id_subservice: subService.id })
    }
  }

  return subService
}

export const updateSubservices = async (
  subservice: {
    id?: number
    id_services: number
    name: string
    subservice_details: ISubserviceDetail[]
  },
  id_service: number
): Promise<void> => {
  try {
    const { id, subservice_details, ...restOfSubservice } = subservice

    if (id) {
      await SubService.update(restOfSubservice, {
        where: { id, id_services: id_service },
      })
    } else {
      await SubService.create({ ...restOfSubservice, id_services: id_service })
    }

    if (subservice_details && subservice_details.length > 0) {
      for (const detail of subservice_details) {
        await updateDetailSubservices(detail, id || id_service)
      }
    }
  } catch (error) {
    console.error('Error updating subservices:', error)
    throw new Error('Error updating subservices')
  }
}
