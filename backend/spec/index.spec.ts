import createImg from "../src/createImg.js";
import router from '../src/index.js';
import request from 'supertest';
import express from 'express';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(router);

  it('should return 200 for  list of files', async () => {
    const response = await request(app).get('/list-files');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 200 upload route', async () => {
    const response = await request(app).post('/uploadImg');

    expect(response.status).toBe(200);
  });



describe("Try to use Resize image", () => {
  const resizedImagesDir = path.join(__dirname, "../../imgs/resized");
  const testFilename = "test";
  const targetWidth = 90;
  const targetHeight = 60;
  const expectedOutputPath = path.join(resizedImagesDir, `${testFilename}-${targetWidth}x${targetHeight}.jpg`);

  afterAll(() => {
    if (fs.existsSync(expectedOutputPath)) {
      fs.unlinkSync(expectedOutputPath);
    }
  });

  it("should create an image with correct dimensions", async () => {
    const resultPath = await createImg(testFilename, targetWidth, targetHeight);
    expect(resultPath).toBe(expectedOutputPath);
    expect(fs.existsSync(resultPath)).toBeTrue();
  });
});
