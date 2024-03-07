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
exports.deleteNew = exports.getNewBySlug = exports.getLimitNews = exports.getAllNews = exports.createNews = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../categories/model"));
// export const createNews = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const newsItem = (await News.create(req.body)) as INews
//     res.status(201).json(newsItem)
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error instanceof Error ? error.message : 'An unexpected error occurred',
//     })
//   }
// }
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newsItem;
        // Si la solicitud incluye un ID, intenta actualizar la noticia
        if (req.body.id) {
            // Actualizar noticia
            const existingNews = yield model_1.default.findByPk(req.body.id);
            if (existingNews) {
                existingNews.set(req.body);
                newsItem = yield existingNews.save();
            }
            else {
                newsItem = null;
            }
        }
        else {
            // Crear una nueva noticia
            newsItem = (yield model_1.default.create(req.body));
        }
        if (newsItem) {
            res.status(200).json(newsItem);
        }
        else {
            res.status(404).json({ message: 'Noticia no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ocurrió un error inesperado',
        });
    }
});
exports.createNews = createNews;
// export const updateNews = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     console.log(11111111)
//     const { id } = req.params // Obtiene el ID de la noticia desde los parámetros de la URL
//     const updateData = req.body // Obtiene los datos a actualizar desde el cuerpo de la solicitud
//     // Busca y actualiza la noticia correspondiente al ID proporcionado
//     const [numberOfAffectedRows, [updatedNewsItem]] = await News.update(
//       updateData,
//       {
//         where: { id: id },
//         returning: true, // Esta opción no está soportada por todos los dialectos SQL en Sequelize
//       }
//     )
//     if (numberOfAffectedRows === 0) {
//       // Si no se encontró la noticia o no se actualizó, envía un 404
//       return res.status(404).json({ message: 'News item not found' })
//     }
//     // Envía la noticia actualizada como respuesta
//     res.status(200).json(updatedNewsItem)
//   } catch (error: any) {
//     console.log(error)
//     // Maneja cualquier error que pueda ocurrir durante la actualización
//     res.status(500).json({
//       message: error.message || 'An unexpected error occurred',
//     })
//   }
// }
const getAllNews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = (yield model_1.default.findAll({
            include: [
                {
                    model: model_2.default,
                },
            ],
        }));
        res.status(200).json(news);
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
exports.getAllNews = getAllNews;
const getLimitNews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(_req.params.limit);
        let options = {};
        if (!isNaN(limit) && limit > 0) {
            options = { limit };
        }
        const news = (yield model_1.default.findAll(Object.assign({ include: [
                {
                    model: model_2.default,
                },
            ] }, options)));
        res.status(200).json(news);
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
exports.getLimitNews = getLimitNews;
const getNewBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const news = yield model_1.default.findOne({
            where: {
                slug,
            },
        });
        res.status(200).json(news);
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
exports.getNewBySlug = getNewBySlug;
const deleteNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        yield model_1.default.destroy({
            where: { slug: slug },
        });
        res.status(200).json({ msg: 'Se ha eliminado la noticia correctamente' });
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
exports.deleteNew = deleteNew;
