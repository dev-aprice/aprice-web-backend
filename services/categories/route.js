"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = (0, express_1.Router)();
router.post('/create-category', controller_1.createCategory);
router.get('/get-all-categories', controller_1.getAllCategories);
exports.default = router;
