import express from 'express'
import { checkAuthMiddleware } from '../../middleware/checkAuthMiddleware';
import * as filesControllers from '../../controllers/file-controller/fileController'
import { Validator } from "express-json-validator-middleware";
import { Request } from "express"
import { FileUpdateSchema } from './schema';

const router = express.Router()
const { validate } = new Validator({});

router.post("/upload", checkAuthMiddleware, (req, res) => filesControllers.uploadFile(req, res))

router.delete("/delete/:id", checkAuthMiddleware, (req:Request<{id:string}>, res) => filesControllers.deleteFile(req, res))

router.post("/download/:id", checkAuthMiddleware, (req:Request<{id:string}>, res) => filesControllers.downloadFile(req, res))

router.post("/update", validate({ body: FileUpdateSchema }), checkAuthMiddleware, (req, res) => filesControllers.updateFile(req, res))

router.get("/list", (req:Request<{}, {}, {}, { page:number, list_size:number}>, res) => filesControllers.getFiles(req, res))

router.get("/:id", checkAuthMiddleware, (req:Request<{id:string}>, res) => filesControllers.getFile(req, res))

export default router