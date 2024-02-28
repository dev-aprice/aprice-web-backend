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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeByID = exports.getAllEmployees = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../social-media/model"));
const controller_1 = require("../social-media/controller");
const model_3 = __importDefault(require("../role/model"));
const getAllEmployees = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield model_1.default.findAll({
            include: [
                {
                    model: model_2.default,
                    required: false,
                },
                {
                    model: model_3.default,
                    required: false,
                },
            ],
        });
        res.status(200).json(employees);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const employee = yield model_1.default.findByPk(employeeId, {
            include: [
                {
                    model: model_2.default,
                    required: false,
                },
            ],
        });
        if (!employee) {
            res.status(404).json({
                msg: 'Employee not found',
            });
        }
        res.status(200).json(employee);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                msg: error.message,
            });
        }
        else {
            res.status(500).json({
                msg: 'An unexpected error occurred',
            });
        }
    }
});
exports.getEmployeeByID = getEmployeeByID;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { social_media } = _a, employeeData = __rest(_a, ["social_media"]);
        const newEmployee = (yield model_1.default.create(employeeData));
        if (social_media && social_media.length > 0) {
            yield (0, controller_1.createSocialMedia)(social_media, newEmployee.id);
        }
        res.status(201).json(newEmployee);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({
                msg: error.message,
            });
        }
        else {
            res.status(500).json({
                msg: 'An unexpected error occurred',
            });
        }
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const employeeIdAsNumber = +employeeId;
        const _b = req.body, { socialMedia } = _b, employeeData = __rest(_b, ["socialMedia"]);
        const employee = yield model_1.default.findByPk(employeeId);
        if (!employee) {
            res.status(404).json({
                msg: 'Empleado no encontrado',
            });
            return;
        }
        yield model_1.default.update(employeeData, {
            where: {
                id: employeeIdAsNumber,
            },
        });
        if (socialMedia && socialMedia.length > 0) {
            yield (0, controller_1.updateSocialMedia)(socialMedia, employeeIdAsNumber);
        }
        const updatedEmployee = yield model_1.default.findByPk(employeeIdAsNumber, {
            include: [
                {
                    model: model_2.default,
                    required: false,
                },
            ],
        });
        res.status(200).json(updatedEmployee);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                msg: error.message,
            });
        }
        else {
            res.status(500).json({
                msg: 'An unexpected error occurred',
            });
        }
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const employeeIdAsNumber = +employeeId;
        yield (0, controller_1.destroySocialMediaByEmployeeId)(employeeIdAsNumber);
        const deleted = yield model_1.default.destroy({
            where: { id: employeeIdAsNumber },
        });
        if (deleted) {
            res.status(200).send(`Employee with ID ${employeeId} deleted.`);
        }
        else {
            res.status(404).send('Employee not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: error.message });
        }
        else {
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.deleteEmployee = deleteEmployee;
