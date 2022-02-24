import { Request, Response } from "express";

export class ImageController {
  async getByName(req: Request, res: Response) {
    const { name } = req.params;
    
    return res.sendFile(`/uploads/${name}`, { root: '.' });
  }

  async uploadOne(req: Request, res: Response) {
    const image = req.file;

    if (image) {
      return res.json({ url_image: `http://localhost:3333/${image.destination}/${image.filename}` });
    }
  }

  async uploadMultiples(req: Request, res: Response) {
    const images = req.files;
    const ImagesArray = JSON.parse(JSON.stringify(images));

    
    if (images) {
      
      let ImagesURL = [];
      
      ImagesArray.forEach(image => {
        ImagesURL.push(`http://localhost:3333/${image.destination}/${image.filename}`);
      });

      return res.json({ImagesURL});
    }
  }
}