import { Router } from 'express';
import createImg from '../createImg.js';
import path from 'path';

const resizeRouter = Router();
resizeRouter.get('/resize', async (req, res): Promise<void> => {
  const { filename, width, height } = req.query;
  console.log(
    `Received request to resize image: ${filename}, width: ${width}, height: ${height}`
  );

  try {
    const resizedImagePath = await createImg(
      filename as string,
      parseInt(width as string),
      parseInt(height as string)
    );
    res.sendFile(path.resolve(resizedImagePath));
  } catch (error) {
    console.error('Error resizing image:', error);
    res.status(500).send('Error resizing image');
  }
});
export default resizeRouter;
