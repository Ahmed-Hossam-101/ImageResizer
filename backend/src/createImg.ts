import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
//* variables
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const originalsImagesDir = path.join(dirname, '../../imgs/originals');
const resizedImagesDir = path.join(dirname, '../../imgs/resized');

const createImg = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const originalImagePath = path.join(originalsImagesDir, filename + '.jpg');

  const newfilename = `${filename}-${width}x${height}.jpg`;
  const resizedImagePath = path.join(resizedImagesDir, newfilename);

  if (fs.existsSync(resizedImagePath)) {
    return resizedImagePath;
  }

  if (!fs.existsSync(originalImagePath)) {
    throw new Error('Original image not found');
  }

  await sharp(originalImagePath).resize(width, height).toFile(resizedImagePath);

  return resizedImagePath;
};

export default createImg;
