
import { Router } from "express";

export const reactRouter = Router()
import * as reactServices from './services/react.services.js'
import { authenticationMiddleware, errorhandellerMiddleware } from "../../middlewares/index.js";

reactRouter.post('/addReact/:reactOnId',
    authenticationMiddleware(),
    errorhandellerMiddleware(reactServices.addReact)
)

reactRouter.delete('/deleteReact/:reactId',
    authenticationMiddleware(),
    errorhandellerMiddleware(reactServices.deleteReact)
)



