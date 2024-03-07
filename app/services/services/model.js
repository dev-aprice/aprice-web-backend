"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const model_1 = __importDefault(require("../subservices/model"));
const model_2 = __importDefault(require("../partners/model"));
const Service = db_1.default.define('services', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    resume: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_partner: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'partners',
            key: 'id',
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
Service.hasMany(model_1.default, { foreignKey: 'id_services' });
Service.belongsTo(model_2.default, { foreignKey: 'id_partner' });
exports.default = Service;
