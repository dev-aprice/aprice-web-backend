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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeByID = exports.getAllEmployees = void 0;
var model_1 = require("./model");
var model_2 = require("../social-media/model");
var controller_1 = require("../social-media/controller");
var model_3 = require("../role/model");
var getAllEmployees = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employees, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model_1.default.findAll({
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
                    })];
            case 1:
                employees = _a.sent();
                res.status(200).json(employees);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    res.status(500).send(error_1.message);
                }
                else {
                    res.status(500).send('An unexpected error occurred');
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllEmployees = getAllEmployees;
var getEmployeeByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeId, employee, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                employeeId = req.params.employeeId;
                return [4 /*yield*/, model_1.default.findByPk(employeeId, {
                        include: [
                            {
                                model: model_2.default,
                                required: false,
                            },
                        ],
                    })];
            case 1:
                employee = _a.sent();
                if (!employee) {
                    res.status(404).json({
                        msg: 'Employee not found',
                    });
                }
                res.status(200).json(employee);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    res.status(500).json({
                        msg: error_2.message,
                    });
                }
                else {
                    res.status(500).json({
                        msg: 'An unexpected error occurred',
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeeByID = getEmployeeByID;
var createEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, social_media, employeeData, newEmployee, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, social_media = _a.social_media, employeeData = __rest(_a, ["social_media"]);
                return [4 /*yield*/, model_1.default.create(employeeData)];
            case 1:
                newEmployee = (_b.sent());
                if (!(social_media && social_media.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, controller_1.createSocialMedia)(social_media, newEmployee.id)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                res.status(201).json(newEmployee);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                if (error_3 instanceof Error) {
                    console.log(error_3);
                    res.status(500).json({
                        msg: error_3.message,
                    });
                }
                else {
                    res.status(500).json({
                        msg: 'An unexpected error occurred',
                    });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createEmployee = createEmployee;
var updateEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeId, employeeIdAsNumber, _a, socialMedia, employeeData, employee, updatedEmployee, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                employeeId = req.params.employeeId;
                employeeIdAsNumber = +employeeId;
                _a = req.body, socialMedia = _a.socialMedia, employeeData = __rest(_a, ["socialMedia"]);
                return [4 /*yield*/, model_1.default.findByPk(employeeId)];
            case 1:
                employee = _b.sent();
                if (!employee) {
                    res.status(404).json({
                        msg: 'Empleado no encontrado',
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, model_1.default.update(employeeData, {
                        where: {
                            id: employeeIdAsNumber,
                        },
                    })];
            case 2:
                _b.sent();
                if (!(socialMedia && socialMedia.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, controller_1.updateSocialMedia)(socialMedia, employeeIdAsNumber)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, model_1.default.findByPk(employeeIdAsNumber, {
                    include: [
                        {
                            model: model_2.default,
                            required: false,
                        },
                    ],
                })];
            case 5:
                updatedEmployee = _b.sent();
                res.status(200).json(updatedEmployee);
                return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                if (error_4 instanceof Error) {
                    res.status(500).json({
                        msg: error_4.message,
                    });
                }
                else {
                    res.status(500).json({
                        msg: 'An unexpected error occurred',
                    });
                }
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateEmployee = updateEmployee;
var deleteEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeId, employeeIdAsNumber, deleted, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                employeeId = req.params.employeeId;
                employeeIdAsNumber = +employeeId;
                return [4 /*yield*/, (0, controller_1.destroySocialMediaByEmployeeId)(employeeIdAsNumber)];
            case 1:
                _a.sent();
                return [4 /*yield*/, model_1.default.destroy({
                        where: { id: employeeIdAsNumber },
                    })];
            case 2:
                deleted = _a.sent();
                if (deleted) {
                    res.status(200).send("Employee with ID ".concat(employeeId, " deleted."));
                }
                else {
                    res.status(404).send('Employee not found');
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                if (error_5 instanceof Error) {
                    res.status(500).json({ msg: error_5.message });
                }
                else {
                    res.status(500).send('An unexpected error occurred');
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteEmployee = deleteEmployee;
