import {Router} from 'express'
export const authRouter = Router()
import * as authServices from './auth.services/auth.services.js'
import { errorhandellerMiddleware } from '../../middlewares/errorhandeller.middleware.js'

authRouter.post('/signUp',errorhandellerMiddleware(authServices.signUpServices))
authRouter.post('/confirm-email',errorhandellerMiddleware(authServices.confirmEmailService))
authRouter.post('/login',errorhandellerMiddleware(authServices.signInServices))
authRouter.post('/gmail-login',errorhandellerMiddleware(authServices.GmailLoginServices))
authRouter.post('/gmail-signup',errorhandellerMiddleware(authServices.GmailRegisterService))

