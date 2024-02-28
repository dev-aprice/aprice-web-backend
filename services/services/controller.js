"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceBySlug = exports.getAllServices = exports.createService = void 0;
var model_1 = require("./model");
var model_2 = require("../subservices/model");
var model_3 = require("../subservice-details/model");
var model_4 = require("../clients/model");
var controller_1 = require("../subservices/controller");
var createService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, resume, description, slug, id_client, subservices, service, _i, subservices_1, subservice, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, resume = _a.resume, description = _a.description, slug = _a.slug, id_client = _a.id_client, subservices = _a.subservices;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, model_1.default.create({
                        name: name,
                        resume: resume,
                        description: description,
                        slug: slug,
                        id_client: id_client,
                    })];
            case 2:
                service = (_b.sent());
                if (!(subservices && subservices.length > 0)) return [3 /*break*/, 6];
                _i = 0, subservices_1 = subservices;
                _b.label = 3;
            case 3:
                if (!(_i < subservices_1.length)) return [3 /*break*/, 6];
                subservice = subservices_1[_i];
                return [4 /*yield*/, (0, controller_1.createSubService)(__assign(__assign({}, subservice), { id_services: service.id }))];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, res.status(201).json({
                    msg: 'Se ha creado el nuevo servicio correctamente',
                    service: service,
                })];
            case 7:
                error_1 = _b.sent();
                console.error('Error creating service:', error_1.message);
                return [2 /*return*/, res.status(500).json({ error: error_1.message })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createService = createService;
var getAllServices = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var services, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model_1.default.findAll({
                        include: [model_4.default],
                    })];
            case 1:
                services = _a.sent();
                res.status(200).json(services);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    res.status(500).send(error_2.message);
                }
                else {
                    res.status(500).send('An unexpected error occurred');
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllServices = getAllServices;
var getServiceBySlug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, service, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = req.params.slug;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.findOne({
                        where: {
                            slug: slug,
                        },
                        include: [
                            {
                                model: model_2.default,
                                include: [
                                    {
                                        model: model_3.default,
                                    },
                                ],
                            },
                        ],
                    })];
            case 2:
                service = _a.sent();
                res.status(200).json(service);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    res.status(500).send(error_3.message);
                }
                else {
                    res.status(500).send('An unexpected error occurred');
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getServiceBySlug = getServiceBySlug;
