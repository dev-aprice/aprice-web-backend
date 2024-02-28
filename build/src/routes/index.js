"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("../../services/employee/route"));
const route_2 = __importDefault(require("../../services/role/route"));
const route_3 = __importDefault(require("../../services/categories/route"));
const route_4 = __importDefault(require("../../services/news/route"));
const route_5 = __importDefault(require("../../services/services/route"));
const router = (0, express_1.Router)();
router.use('/employees', route_1.default);
router.use('/roles', route_2.default);
router.use('/categories', route_3.default);
router.use('/news', route_4.default);
router.use('/services', route_5.default);
exports.default = router;
