const multer = require('multer');
const fs = require('node:fs');

const upload = multer({ dest: 'uploads' });

const saveImage = (file) => {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

module.exports = {upload, saveImage};