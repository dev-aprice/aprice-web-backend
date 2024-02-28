"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const model_1 = __importDefault(require("../social-media/model"));
const model_2 = __importDefault(require("../role/model"));
const Employee = db_1.default.define('employee', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    middle_name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    rut: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_role: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'role',
            key: 'id',
        },
    },
}, {
    freezeTableName: true,
});
Employee.hasMany(model_1.default, { foreignKey: 'id_employee' });
Employee.belongsTo(model_2.default, { foreignKey: 'id_role' });
exports.default = Employee;
