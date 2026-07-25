import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'd7mxefn8',
  api_key: process.env.CLOUDINARY_API_KEY || '184816385962679',
  api_secret: process.env.CLOUDINARY_API_SECRET || '0a883qHolEkGQxI4fnNV6Ai9SEE'
});

/**
 * Uploads a buffer to Cloudinary
 * @param {Buffer} buffer - The image buffer from multer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Object>}
 */
export const uploadToCloudinary = (buffer, folder = 'umkm_products') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default cloudinary;
