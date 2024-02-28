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
exports.getNewBySlug = exports.getLimitNews = exports.getAllNews = exports.createNews = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../categories/model"));
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsItem = (yield model_1.default.create(req.body));
        res.status(201).json(newsItem);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
exports.createNews = createNews;
const getAllNews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = (yield model_1.default.findAll({
            include: [
                {
                    model: model_2.default,
                },
            ],
        }));
        res.status(200).json(news);
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
exports.getAllNews = getAllNews;
const getLimitNews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(_req.params.limit);
        let options = {};
        if (!isNaN(limit) && limit > 0) {
            options = { limit };
        }
        const news = (yield model_1.default.findAll(Object.assign({ include: [
                {
                    model: model_2.default,
                },
            ] }, options)));
        res.status(200).json(news);
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
exports.getLimitNews = getLimitNews;
const getNewBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const news = yield model_1.default.findOne({
            where: {
                slug,
            },
        });
        res.status(200).json(news);
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
exports.getNewBySlug = getNewBySlug;
