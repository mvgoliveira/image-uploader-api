import { Router } from "express";
import multer from "multer";

const routes = Router();

const upload = multer({ dest: 'uploads/' });

routes.post('/image', upload.single('picture'));

routes.post('/images', upload.array('pictures', 10));

export {routes};