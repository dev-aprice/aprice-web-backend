"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post('/create-category', controller_1.createCategory);
router.get('/get-all-categories', controller_1.getAllCategories);
exports.default = router;
