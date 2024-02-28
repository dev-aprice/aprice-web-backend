import SubService from './model'
import { createSubServiceDetail } from '../subservice-details/controller'
import { ISubservice } from './interface'
import { CreationOptional, Model } from 'sequelize'

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
