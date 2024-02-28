"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = require("../../config/db");
// import Employee from '../employee/model'
// import Employee from '../employee/model'
var Role = db_1.default.define('role', {
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
