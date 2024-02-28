"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = require("../../config/db");
var model_1 = require("../subservice-details/model");
var SubService = db_1.default.define('subservices', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_services: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'services',
            key: 'id',
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
SubService.hasMany(model_1.default, { foreignKey: 'id_subservice' });
exports.default = SubService;
