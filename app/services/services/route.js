"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/get-services', controller_1.getAllServices);
router.get('/get-services/:slug', controller_1.getServiceBySlug);
router.post('/create', controller_1.createService);
exports.default = router;
