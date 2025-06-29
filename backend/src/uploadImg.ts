import multer from 'multer';
import path from 'path';
import {Router} from 'express';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, '../../imgs/originals'));
	},
	filename(req, file, cb) {
		cb(null, file.originalname.includes('.jpg') ? file.originalname : `${file.originalname}.jpg`);
	},
});

const upload = multer({storage});

router.post('/uploadImg', upload.single('image'), (req, res) => {
	console.log('Image uploaded!');
	res.send('Image uploaded!');
});

export default router;
