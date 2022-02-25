import fs from "fs";

export class ImageService {
  async uploadOne(image: Express.Multer.File) {
    if (image) {
      return `${process.env.BASE_URL}/${image.destination}/${image.filename}`;
    } else {
      throw new Error("Image cant be uploaded");
    }
  }

  async uploadMultiples(images: Express.Multer.File[]) {
    if (images) {
      let ImagesURL = [];
      
      images.forEach(image => {
        ImagesURL.push(`${process.env.BASE_URL}/${image.destination}/${image.filename}`);
      });

      return ImagesURL;
    } else {
      throw new Error("Images cant be uploaded");
    }
  }

  async removeImage(imgName: String) {
    try {
      await fs.promises.unlink(`./uploads/${imgName}`);
      return ("file deleted successfully");
    } catch (error) {
      throw new Error("This file does not exists");
    }    
  }
}