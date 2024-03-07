import { Model } from 'sequelize'

interface IPartnerAtributes {
  id?: number
  name?: string
  email: string
  avatar?: string
}

export interface IPartnerInstance
  extends Model<IPartnerAtributes>,
    IPartnerAtributes {}
