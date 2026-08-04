import multer from "multer";
import path from "path";
import fs from "fs";

const uploadFolder = process.env.UPLOAD_DIR || "uploads";

if (!fs.existsSync(uploadFolder)) {

    fs.mkdirSync(uploadFolder, {
        recursive: true
    });

}

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, uploadFolder);

    },

    filename(req, file, cb) {

        const unique =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        cb(
            null,
            unique + path.extname(file.originalname)
        );

    }

});

const upload = multer({

    storage,

    limits: {
        fileSize: Number(process.env.MAX_FILE_SIZE) || 10485760
    }

});

export default upload;