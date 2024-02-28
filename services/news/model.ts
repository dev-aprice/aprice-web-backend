import { DataTypes, Model } from 'sequelize'
import db from '../../config/db'
import Categorie from '../categories/model'
import Employee from '../employee/model'
import { INews } from './utils/interface'

interface NewsModel extends Model<INews>, INews {}

const News = db.define<NewsModel>(
  'news',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    slug: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    id_employee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

News.hasMany(Categorie, { foreignKey: 'id' })
News.belongsTo(Employee, { foreignKey: 'id_employee' })

export default News
