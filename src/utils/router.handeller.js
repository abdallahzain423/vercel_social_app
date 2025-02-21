import { globalHandeller } from "../middlewares/index.js"
import { authRouter } from "../modules/auth/auth.controller.js"
import { userRouter } from "../modules/user/user.controller.js"
import {postRouter} from '../modules/post/post.controller.js'
import express from 'express'
import { commentRouter } from "../modules/comment/comment.controller.js"
import { reactRouter } from "../modules/reacts/react.controller.js"
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 2,  

})



export const routerHandeller =(app)=>{   
    // app.use(limiter)


app.use(express.json())
    app.use('/Assets',express.static('Assets'))
    app.use('/user', userRouter)
    app.use('/auth',authRouter)
    app.use('/post',postRouter)
    app.use('/comment',commentRouter)
    app.use('/react',reactRouter)
    app.use(helmet())
    

app.get('/',(req,res)=>{ 
    res.status(200).json({msg:'welcome to social media app'})
})

    app.use(globalHandeller)
}