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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend('re_BaHJexb5_6L1WpT7ebfZEoSHBWGYwiCPW');
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, subject, html, name } = req.body;
        console.log(from, subject, html, name);
        yield resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'valentina@aprice.cl',
            subject: `${subject} de ${name} - [${from}]`,
            html: html,
        });
        res.status(201).json({ msg: 'Mensaje enviado correctamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error al enviar el correo',
        });
    }
});
exports.sendEmail = sendEmail;
