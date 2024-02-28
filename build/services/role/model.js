"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
// import Employee from '../employee/model'
// import Employee from '../employee/model'
const Role = db_1.default.define('role', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
// SocialMedia.belongsTo(Employee, { foreignKey: 'employee_id' })
// Role.hasMany(Employee, { foreignKey: 'role_id' })
exports.default = Role;
