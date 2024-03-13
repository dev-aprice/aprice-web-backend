"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const db_1 = __importDefault(require("../../config/db"));
class User extends sequelize_1.Model {
    setPassword(password) {
        const hashedPassword = bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(10));
        this.password = hashedPassword;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    token_expire: sequelize_1.DataTypes.DATE,
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.default,
    modelName: 'users',
    freezeTableName: true,
    timestamps: false,
    hooks: {
        beforeCreate: (user) => {
            if (user.changed('password')) {
                user.setPassword(user.password);
            }
        },
        beforeUpdate: (user) => {
            if (user.changed('password')) {
                user.setPassword(user.password);
            }
        },
    },
});
exports.default = User;
