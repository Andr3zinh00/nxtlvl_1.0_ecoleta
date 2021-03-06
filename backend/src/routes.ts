import express from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from "celebrate";

const routes = express.Router();


const pointController = new PointsController();
const itemsController = new ItemsController();

const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), celebrate(
    {
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }),
    },
    { abortEarly: false }
), pointController.create);
routes.get('/points/:id', pointController.show)
routes.get('/points/', pointController.index)

export default routes;