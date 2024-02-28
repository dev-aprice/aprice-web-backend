import { Model } from 'sequelize'

interface IEmployeeAttributes {
  id?: number
  first_name: string
  middle_name?: string
  last_name: string
  rut: string
  email: string
  avatar?: string
  role: string
}

export interface IEmployeeInstance
  extends Model<IEmployeeAttributes>,
    IEmployeeAttributes {}
