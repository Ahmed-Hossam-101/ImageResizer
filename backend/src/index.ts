import express from 'express';
import resizeRouter from './routes/resize.js';
import router from './uploadImg.js';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use('/api/imgs', resizeRouter);
app.use('/', router);
app.use(
	'/imgs/originals',
	express.static(path.join(__dirname, '../../imgs/originals')),
);
app.use(
	'/imgs/resized',
	express.static(path.join(__dirname, '../../imgs/resized')),
);

app.get('/list-files', (req, res) => {
	fs.readdir(path.join(__dirname, '../../imgs/originals'), (err, files) => {
		if (err) {
			return res.status(500).json({error: 'Can'});
		}

		res.json(files);
	});
});

export default app;

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
