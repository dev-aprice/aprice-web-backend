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
exports.destroySocialMediaByEmployeeId = exports.updateSocialMedia = exports.createSocialMedia = void 0;
const model_1 = __importDefault(require("./model"));
const createSocialMedia = (socialMediaData, id, idType) => __awaiter(void 0, void 0, void 0, function* () {
    const socialMediaPromises = socialMediaData.map((data) => __awaiter(void 0, void 0, void 0, function* () {
        const idKey = idType === 'employee' ? 'id_employee' : 'id_partner';
        return model_1.default.create(Object.assign(Object.assign({}, data), { [idKey]: id }));
    }));
    yield Promise.all(socialMediaPromises);
});
exports.createSocialMedia = createSocialMedia;
const updateSocialMedia = (socialMedia, id_employee) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.destroy({
            where: {
                id_employee,
            },
        });
        const createSocialMediaPromise = socialMedia.map((sm) => model_1.default.create(Object.assign(Object.assign({}, sm), { id_employee })));
        yield Promise.all(createSocialMediaPromise);
    }
    catch (error) {
        console.error('Error updating social media:', error);
        throw new Error('Error updating social media');
    }
});
exports.updateSocialMedia = updateSocialMedia;
const destroySocialMediaByEmployeeId = (idType, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idKey = idType === 'employee' ? 'id_employee' : 'id_partner';
        yield model_1.default.destroy({
            where: { [idKey]: id },
        });
    }
    catch (error) {
        console.error('Error deleting social media:', error);
        throw new Error('Error deleting social media');
    }
});
exports.destroySocialMediaByEmployeeId = destroySocialMediaByEmployeeId;
