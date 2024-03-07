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
exports.updateDetailSubservices = exports.createSubServiceDetail = void 0;
const model_1 = __importDefault(require("./model"));
const createSubServiceDetail = (subservicesDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const detail = yield model_1.default.create(subservicesDetails);
    return detail;
});
exports.createSubServiceDetail = createSubServiceDetail;
const updateDetailSubservices = (subserviceDetail, id_subservice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = subserviceDetail;
        if (id) {
            yield model_1.default.update(subserviceDetail, {
                where: { id, id_subservice },
            });
        }
        else {
            yield model_1.default.create(Object.assign(Object.assign({}, subserviceDetail), { id_subservice }));
        }
    }
    catch (error) {
        console.error('Error updating subservice details:', error);
        throw new Error('Error updating subservice details');
    }
});
exports.updateDetailSubservices = updateDetailSubservices;
