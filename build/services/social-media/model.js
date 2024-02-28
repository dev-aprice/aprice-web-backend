"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
// import Employee from '../employee/model'
const SocialMedia = db_1.default.define('social_media', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_employee: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'employee',
            key: 'id',
        },
    },
    platform_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    profile_link: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    freezeTableName: true,
});
// SocialMedia.belongsTo(Employee, { foreignKey: 'employee_id' })
exports.default = SocialMedia;
