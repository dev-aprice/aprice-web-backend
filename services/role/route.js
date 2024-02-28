"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = (0, express_1.Router)();
router.get('/get-roles', controller_1.getAllRoles);
exports.default = router;
