"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.login = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = __importDefault(require("./model"));
const generateToken_1 = require("./middlewares/generateToken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Buscar al usuario
        const user = (yield model_1.default.findOne({
            where: {
                email,
            },
        }));
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: 'Contraseña o usuario incorrecto',
            });
        }
        // Comparar contraseñas (Se asume que la contraseña almacenada está hasheada)
        bcrypt_nodejs_1.default.compare(password, user.password, (err, isPasswordValid) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || !isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    msg: 'Contraseña o usuario incorrecto',
                });
            }
            // Usuario existe y contraseña correcta
            const { id, name, email } = user; // Destructure id, name, and email from user
            const refreshToken = (0, generateToken_1.generateRefreshToken)({ id, name, email });
            // Guardar el token de actualización en la base de datos
            yield model_1.default.update({
                token: refreshToken,
                token_expire: (0, generateToken_1.getExpirationDate)(),
            }, {
                where: {
                    email,
                },
            });
            const token = jsonwebtoken_1.default.sign({
                id,
                name,
                email,
            }, process.env.SECRETKEYTOKEN, {
                expiresIn: '720h',
            });
            return res.status(200).json({
                success: true,
                msg: 'Se ha iniciado sesión con éxito',
                token,
                user: { id, name, email },
                refreshToken,
            });
        }));
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Ha ocurrido un error al iniciar sesión',
        });
    }
});
exports.login = login;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.create(req.body);
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            error,
        });
    }
});
exports.create = create;
