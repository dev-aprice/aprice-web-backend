import { DataTypes } from 'sequelize'
import db from '../../config/db'
import SubService from '../subservices/model'
import Client from '../clients/model'

const Service = db.define(
  'services',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)
Service.hasMany(SubService, { foreignKey: 'id_services' })
Service.hasMany(Client, { foreignKey: 'id' })

export default Service
