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
exports.getServiceBySlug = exports.getAllServices = exports.createService = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../subservices/model"));
const model_3 = __importDefault(require("../subservice-details/model"));
const model_4 = __importDefault(require("../clients/model"));
const controller_1 = require("../subservices/controller");
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, resume, description, slug, id_client, subservices } = req.body;
    try {
        const service = (yield model_1.default.create({
            name,
            resume,
            description,
            slug,
            id_client,
        }));
        if (subservices && subservices.length > 0) {
            for (const subservice of subservices) {
                yield (0, controller_1.createSubService)(Object.assign(Object.assign({}, subservice), { id_services: service.id }));
            }
        }
        return res.status(201).json({
            msg: 'Se ha creado el nuevo servicio correctamente',
            service,
        });
    }
    catch (error) {
        console.error('Error creating service:', error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.createService = createService;
const getAllServices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield model_1.default.findAll({
            include: [model_4.default],
        });
        res.status(200).json(services);
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
exports.getAllServices = getAllServices;
const getServiceBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const service = yield model_1.default.findOne({
            where: {
                slug,
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
        });
        res.status(200).json(service);
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
exports.getServiceBySlug = getServiceBySlug;
