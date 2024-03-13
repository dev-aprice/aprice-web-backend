"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post('/login', controller_1.login);
router.post('/create', controller_1.create);
exports.default = router;
