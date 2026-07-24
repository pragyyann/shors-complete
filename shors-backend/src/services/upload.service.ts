import { cloudinary } from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

export class UploadService {
  /**
   * Upload an image buffer to Cloudinary
   */
  async uploadImage(fileBuffer: Buffer) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "shors",
          crop: "limit", // preserve aspect ratio while limiting dimensions if needed, or simply let Cloudinary maintain it by default
        },
        (error: any, result: any) => {
          if (error) {
            console.error("========== CLOUDINARY ERROR ==========");
            console.dir(error, { depth: null });
            console.error("=====================================");
            return reject(error);
          }

          if (!result) {
            return reject(new Error("No result returned from Cloudinary"));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );

      uploadStream.end(fileBuffer);
    });
  }

  /**
   * Delete an image from Cloudinary by its publicId
   */
  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result !== "ok") {
        throw new ApiError(400, "Failed to delete image from Cloudinary");
      }
      return true;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Error communicating with Cloudinary during deletion");
    }
  }
}
