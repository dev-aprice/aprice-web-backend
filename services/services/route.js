"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = (0, express_1.Router)();
router.get('/get-services', controller_1.getAllServices);
router.get('/get-services/:slug', controller_1.getServiceBySlug);
router.post('/create', controller_1.createService);
exports.default = router;
