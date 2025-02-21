import { Router} from "express";

export const postRouter = Router({
    caseSensitive: true,
    strict: true
})
import * as postServices from './services/post.services.js'
import { authenticationMiddleware, checkIfUserExist, errorhandellerMiddleware,
     multerHost 
    } from "../../middlewares/index.js";
import { ImageExtentions } from "../../constants/constant.js";

postRouter.post('/create',
    authenticationMiddleware(),
    multerHost(ImageExtentions).array('images',3),
    checkIfUserExist, 
    errorhandellerMiddleware(postServices.addPostService)
    
)
postRouter.get('/list',authenticationMiddleware(),errorhandellerMiddleware(postServices.listPosts))




