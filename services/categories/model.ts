import { DataTypes, Model } from 'sequelize'
import db from '../../config/db'
import { ICategoryInstance } from './interface'

interface CategoryModel extends Model<ICategoryInstance>, ICategoryInstance {}

const Categorie = db.define<CategoryModel>(
  'categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default Categorie
