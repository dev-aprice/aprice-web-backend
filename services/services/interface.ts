import { ISubservice } from '../subservices/interface'

export interface IServices {
  id?: number
  name: string
  resume: string
  description: string
  slug: string
  id_partner: string
  subservices: ISubservice[]
}
