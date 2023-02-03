import { Router } from "express";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post("/upload", upload.array('files', 10), (req, res) => {
    try {
        res.end("Received files!");
    }
    catch (e) {
        throw e;
    }
});

export default router;