"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = require("../../config/db");
// import Employee from '../employee/model'
var SocialMedia = db_1.default.define('social_media', {
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
