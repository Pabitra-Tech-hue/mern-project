import cloudinary from "../config/cloudinary.config";
import AppError from "./appError.utils";
import fs from "fs";


// Upload file to Cloudinary
export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  dir = "/",
) => {
  try {
    const uploadFolder = "/team_16_1_30" + dir;

    const { secure_url: path, public_id } =
      await cloudinary.uploader.upload(file.path, {
        unique_filename: true,
        folder: uploadFolder,
      });

    // Delete file from local uploads folder
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return { 
      path, 
      public_id 
    };

  } catch (error) {
    console.log(error);
    throw new AppError("Something went wrong", 500);
  }
};


// Delete file from Cloudinary
export const deleteFileFormCloudinary = async (
  public_id: string
) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);

    return result;

  } catch (error) {
    console.log(error);
    throw new AppError("Failed to delete file from Cloudinary", 500);
  }
};