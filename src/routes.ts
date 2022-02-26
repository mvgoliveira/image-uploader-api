import { Router } from "express";
import multer from "multer";
import { ImageController } from "./controllers/ImageController";
import { UploadImage } from "./middlewares/UploadImage";

const routes = Router();

const uploadImage = new UploadImage();
const upload = multer(uploadImage.getConfig);

const imageController = new ImageController();

routes.get('/uploads/:name', imageController.getByName);

routes.post('/image/:name', upload.single('picture'), imageController.uploadOne);

routes.post('/images', upload.array('pictures', 10), imageController.uploadMultiples);

routes.delete('/image/:imgName', imageController.removeImage);

export {routes};