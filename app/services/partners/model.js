"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const model_1 = __importDefault(require("../social-media/model"));
const Partner = db_1.default.define('partners', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'El correo electrónico proporcionado no es válido',
            },
        },
    },
    avatar: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
Partner.hasMany(model_1.default, { foreignKey: 'id_partner' });
exports.default = Partner;
