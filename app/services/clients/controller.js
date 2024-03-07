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
exports.updateClient = exports.deleteClient = exports.createClient = exports.getAllClients = void 0;
const model_1 = __importDefault(require("./model"));
const getAllClients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = (yield model_1.default.findAll());
        res.status(200).json(clients);
    }
    catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Error fetching clients' });
    }
});
exports.getAllClients = getAllClients;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientData = req.body;
        const newClient = yield model_1.default.create(clientData);
        res.status(201).json(newClient);
    }
    catch (error) {
        console.error('Error creating new client:', error);
        res.status(500).json({ error: 'Error creating new client' });
    }
});
exports.createClient = createClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield model_1.default.destroy({
            where: { id },
        });
        if (deleted) {
            res.sendStatus(204);
        }
        else {
            res.status(404).json({ error: 'Client not found' });
        }
    }
    catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Error deleting client' });
    }
});
exports.deleteClient = deleteClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const [updatedRows] = yield model_1.default.update(updateData, {
            where: { id },
        });
        if (updatedRows > 0) {
            const clients = yield model_1.default.findAll();
            if (clients) {
                res.status(200).json(clients);
            }
            else {
                res.status(404).json({ error: 'Client not found' });
            }
        }
        else {
            res.status(404).json({ error: 'Client not found' });
        }
    }
    catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ error: 'Error updating client' });
    }
});
exports.updateClient = updateClient;
