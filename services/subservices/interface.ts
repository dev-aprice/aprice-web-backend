import { ISubserviceDetail } from '../subservice-details/interface'

export interface ISubservice {
  name: string
  id_services: number
  subservice_details: ISubserviceDetail[]
}
