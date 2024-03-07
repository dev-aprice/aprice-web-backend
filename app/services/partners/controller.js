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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePartner = exports.deletePartner = exports.createPartner = exports.getAllPartners = void 0;
const controller_1 = require("../social-media/controller");
const model_1 = __importDefault(require("./model"));
const getAllPartners = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partners = yield model_1.default.findAll();
        res.status(200).json(partners);
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
exports.getAllPartners = getAllPartners;
const createPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { social_media } = _a, partnerData = __rest(_a, ["social_media"]);
        const newPartner = (yield model_1.default.create(partnerData));
        if (social_media && social_media.length > 0) {
            yield (0, controller_1.createSocialMedia)(social_media, newPartner.id, 'partner');
        }
        res.status(201).json(newPartner);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
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
exports.createPartner = createPartner;
const deletePartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { partnerId } = req.params;
        const partnerIdNumber = +partnerId;
        yield (0, controller_1.destroySocialMediaByEmployeeId)('partner', partnerIdNumber);
        const deleted = yield model_1.default.destroy({
            where: { id: partnerIdNumber },
        });
        if (deleted) {
            res.status(200).send(`Partner with ID ${partnerId} deleted.`);
        }
        else {
            res.status(404).send('Partner not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: error.message });
        }
        else {
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.deletePartner = deletePartner;
const updatePartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const partnerData = req.body;
    try {
        const partner = yield model_1.default.findByPk(parseInt(id, 10));
        if (!partner) {
            res.status(404).json({ error: `Partner with ID ${id} not found` });
            return;
        }
        yield partner.update(partnerData);
        res.status(200).json({ message: 'Partner updated successfully' });
    }
    catch (error) {
        console.error('Error updating partner:', error);
        res.status(500).json({ error: 'Error updating partner' });
    }
});
exports.updatePartner = updatePartner;
