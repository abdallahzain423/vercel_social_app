import {Router} from 'express'
export const userRouter = Router()
// import { Multer } from '../../middlewares/multer.middleware.js'


import * as userServices from './services/user.services.js'
import { errorhandellerMiddleware } from '../../middlewares/errorhandeller.middleware.js'
import { ImageExtentions } from '../../constants/constant.js'
import { multerLocal ,multerHost} from '../../middlewares/multer.middleware.js'


// userRouter.post('/uploadtest', errorhandellerMiddleware(userServices.uploadProfilePicture)) 

userRouter.post('/upload',
    multerLocal('user',ImageExtentions).single('img'),
    errorhandellerMiddleware(userServices.uploadProfilePicture) 
)

userRouter.post('/add-cover-pic',
    multerLocal('user/profile',ImageExtentions).array('img',3),
    errorhandellerMiddleware(userServices.uploadeCoverPicture)
)


//=============================clodinary ================//

userRouter.post('/upload-cloud-profile',
    multerHost(ImageExtentions).single('pic'),
    errorhandellerMiddleware(userServices.uploadPicCloud) 
)
