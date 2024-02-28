"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const model_1 = __importDefault(require("../categories/model"));
const model_2 = __importDefault(require("../employee/model"));
const News = db_1.default.define('news', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.TEXT,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    id_category: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
    id_employee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employee',
            key: 'id',
        },
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
News.hasMany(model_1.default, { foreignKey: 'id' });
News.belongsTo(model_2.default, { foreignKey: 'id_employee' });
exports.default = News;
