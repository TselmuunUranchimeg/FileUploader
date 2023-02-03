"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
router.post("/upload", upload.array('files', 10), (req, res) => {
    var _a;
    try {
        console.log((_a = req.files) === null || _a === void 0 ? void 0 : _a.length);
        res.end("Received files!");
    }
    catch (e) {
        throw e;
    }
});
exports.default = router;
