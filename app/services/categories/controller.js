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
exports.getAllCategories = exports.createCategory = void 0;
const model_1 = __importDefault(require("./model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = (yield model_1.default.create(req.body));
        res.status(201).json(newCategory);
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
exports.createCategory = createCategory;
const getAllCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = (yield model_1.default.findAll());
        res.status(201).json(categories);
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
exports.getAllCategories = getAllCategories;
