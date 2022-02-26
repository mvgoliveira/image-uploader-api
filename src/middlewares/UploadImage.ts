import multer from "multer";
import path from "path";
import fs from "fs";
import mime from "mime-types";
import { Request } from "express";

export class  UploadImage {
  private URL: string = path.basename('uploads/');

  constructor() {}
  
  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      //Criar o arquivo de destino
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.URL)) {
          fs.mkdirSync(this.URL);
        }

        cb(null, this.URL);
      },

      //Renomeia o arquivo
      filename: (req, file, cb) => {
        //renomeia o arquivo
        cb(null, `${req.params.name}.png`);
      }
    });
  }

  private fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      //Identificar o tipo do arquivo
      const type = mime.extension(file.mimetype);

      //Definir as extensões permitidas
      const extensionsAllowed = ["png", "jpeg", "jpg"];

      if (extensionsAllowed.includes(`${type}`)) {
        //Caso a extensão estiver correta
        cb(null, true);
      } else {
        //Caso a extensão estiver incorreta
        //Não permite upload e imprime um erro
        cb(null, false);
        const err = new Error('Only .png, .jpeg and .jpg format allowed');
        err.name = 'ExtensionError';
        return cb(err);
      }
      
    }
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      fileFilter: this.fileFilter()
    };
  }
}