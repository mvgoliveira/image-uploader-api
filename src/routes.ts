import { Router } from "express";
import multer from "multer";
import { ImageController } from "./controllers/ImageControler";
import { UploadImage } from "./middlewares/UploadImage";

const routes = Router();

const uploadImage = new UploadImage();
const upload = multer(uploadImage.getConfig);

const imageController = new ImageController();

routes.get('/uploads/:name', imageController.getByName);

routes.post('/image', upload.single('picture'), imageController.uploadOne);

routes.post('/images', upload.array('pictures', 10), imageController.uploadMultiples);

export {routes};