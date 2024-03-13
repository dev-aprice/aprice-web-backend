import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt-nodejs'
import db from '../../config/db'
import { UserAttributes } from './interface'

class User extends Model<UserAttributes> {
  public id!: number
  public name!: string
  public last_name!: string | null
  public email!: string | null
  public password!: string
  public token!: string | null
  public token_expire!: Date | null
  public created_at!: Date
  public updated_at!: Date

  public setPassword(password: string): void {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    this.password = hashedPassword
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    token_expire: DataTypes.DATE,

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: (user: User) => {
        if (user.changed('password')) {
          user.setPassword(user.password)
        }
      },
      beforeUpdate: (user: User) => {
        if (user.changed('password')) {
          user.setPassword(user.password)
        }
      },
    },
  }
)

export default User
