import { Request, Response } from "express";
import { ImageService } from "../services/ImageService";

export class ImageController {
  async getByName(req: Request, res: Response) {
    const { name } = req.params;
    
    return res.sendFile(`/uploads/${name}`, { root: '.' });
  }

  async uploadOne(req: Request, res: Response) {
    const imageService = new ImageService();
    const image = req.file;

    const imageURL = await imageService.uploadOne(image);

    return res.json({imageURL});
  }

  async uploadMultiples(req: Request, res: Response) {
    const imageService = new ImageService();
    const images = req.files;
    
    const imagesURL = await imageService.uploadMultiples(
      JSON.parse(JSON.stringify(images))
      );
      
      return res.json({imagesURL});
    }
    
    async removeImage(req: Request, res: Response) {
      const { imgName } = req.params;
      const imageService = new ImageService();

      try {
        const result = await imageService.removeImage(imgName);
        return res.json({message: result});
      } catch (error) {
        return res.status(400).json({error: error.message});
      }
    }
  }