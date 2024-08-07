import { Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path'
import fs from 'fs'
import afs from 'fs/promises'
import { db } from '../../models';

export const uploadFile = async (req:RequestInst<{}>, res:Response) => {
    try {
        const { userID } = req.cookies
        if(!userID) return res.status(400).json({ error: 'userID not found' })
        if(!req.files) return res.status(400).json({ error: 'where file?' })

        const file = req.files.file
                
        const filePath = path.join(__dirname, `../../store/user-${userID}-store/${(file as UploadedFile).name}`)        
        
        if(fs.existsSync(filePath)) return res.status(400).json({ error: "File already exist" });
        
        (file as UploadedFile).mv(filePath.toString())


        const type = (file as UploadedFile).name.split('.').pop()
    
        const fileData = await db.files.create({
            userID: userID,
            path: filePath.toString(),
            size: (file as UploadedFile).size,
            name: (file as UploadedFile).name,
            type
        })
    
        return res.status(200).json({ fileData })
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}


export const deleteFile = async (req:RequestInst<{}, BaseFileReq>, res:Response) => {
    try {
        if(!req.params.id || isNaN(+req.params.id)){
            return res.status(400).json({ error: 'Bad request' })
        }

        const fileData:FileI = await db.files.findOne({ where: { id: req.params.id } })
    
        if(!fileData) return res.status(404).json({ error: 'Not found' })
    
        const fileFromDB = await db.files.destroy({ where: { id: req.params.id } })
        const fileFromStore = await afs.rm(fileData.path)

        return res.status(200).json({ fileFromDB, fileFromStore })
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}


export const downloadFile = async (req:RequestInst<{}, BaseFileReq>, res:Response) => {
    try {
        if(!req.params.id || isNaN(+req.params.id)){
            return res.status(400).json({ error: 'Bad request' })
        }

        const file:FileI = await db.files.findOne({ where: { id: req.params.id } })
        if(!file) return res.status(404).json({ error: 'Not found' })

        if(!fs.existsSync(file.path)) return res.status(404).json({ error: 'Not found' })

        return res.download(file.path, file.name)
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}


export const updateFile = async (req:RequestInst<UpdateFile>, res:Response) => {
    try {
        const { userID } = req.cookies
        if(!userID) return res.status(400).json({ error: 'userID not found' })
        if(!req.files) return res.status(400).json({ error: 'where file?' })

        const file = req.files.file
        const fileData:FileI = await db.files.findOne({ where: { id: req.body.data.id } })  
        
        if(!fileData) return res.status(404).json({ error: 'Not found' })
        if(!fs.existsSync(fileData.path)) return res.status(404).json({ error: 'Not found' })

        const type = (file as UploadedFile).name.split('.').pop()
        const filePath = path.join(__dirname, `../../store/user-${userID}-store/${(file as UploadedFile).name}`)

        const updateFileInDB = await db.files.update({
            path: filePath.toString(),
            size: (file as UploadedFile).size,
            name: (file as UploadedFile).name,
            type
        },{ where: { id: req.body.data.id } })

        const deleteFileInStore = await afs.rm(fileData.path);
        (file as UploadedFile).mv(filePath.toString())

        const newFileData = {
            ...fileData,
            path: filePath.toString(),
            size: (file as UploadedFile).size,
            name: (file as UploadedFile).name,
            type
        }

        res.status(200).json({ updateFileInDB, deleteFileInStore, newFileData })
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}


export const getFiles = async (req:RequestInst<{}, {}, { page: number, list_size: number }>, res:Response) => {
    if(req.query.page && isNaN(+req.query.page)) return res.status(400).json({ error: 'Bad request' })
    if(req.query.page && isNaN(+req.query.list_size)) return res.status(400).json({ error: 'Bad request' })

    const page = req.query.page ? +req.query.page : 1
    const listSize = req.query.list_size ? +req.query.list_size : 10

    const paginate = (query:object, { page, listSize }:{page:number, listSize:number}) => {
        const offset = page*listSize-listSize;
        const limit = listSize;
      
        return {
          ...query,
          offset,
          limit,
        };
      };

    const filesData = await db.files.findAll(
        paginate(
            {
            },
            {page, listSize}
        )
    )

    return res.status(200).json({ filesData })
}


export const getFile = async (req:RequestInst<{}, BaseFileReq>, res:Response) => {
    if(!req.params.id || isNaN(+req.params.id)){
        return res.status(400).json({ error: 'Bad request' })
    }

    const fileData:FileI = await db.files.findOne({ where: { id: req.params.id } })
    if(!fileData) return res.status(404).json({ error: 'Not found' })

    return res.status(200).json({ fileData })
}