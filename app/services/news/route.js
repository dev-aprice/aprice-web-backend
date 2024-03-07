"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
// router.patch('/update-new/:id', updateNews)
router.post('/create/:id?', controller_1.createNews);
router.get('/get-all-news', controller_1.getAllNews);
router.get('/get-news/:limit', controller_1.getLimitNews);
router.get('/get-new-by-slug/:slug', controller_1.getNewBySlug);
router.delete('/delete-new/:slug', controller_1.deleteNew);
exports.default = router;
