

import { Router } from "express";

export const commentRouter = Router()
import * as commentServices from './services/comment.services.js'

import { checkIfUserExist,authenticationMiddleware,errorhandellerMiddleware, multerHost  } from "../../middlewares/index.js";

import { ImageExtentions } from "../../constants/constant.js";

commentRouter.post('/addComment/:commentOnId',
    authenticationMiddleware(),
    multerHost(ImageExtentions).array('images',3),
    checkIfUserExist,
    errorhandellerMiddleware(commentServices.addComment))

commentRouter.get('/list',
    authenticationMiddleware(),
    errorhandellerMiddleware(commentServices.listComments))




