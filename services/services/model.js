"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = require("../../config/db");
var model_1 = require("../subservices/model");
var model_2 = require("../clients/model");
var Service = db_1.default.define('services', {
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
    id_client: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id',
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
Service.hasMany(model_1.default, { foreignKey: 'id_services' });
Service.hasMany(model_2.default, { foreignKey: 'id' });
exports.default = Service;
