import express from 'express'
import dotenv from 'dotenv'
import { routerHandeller } from './utils/router.handeller.js'
dotenv.config()
import { Server } from "socket.io";


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import cors from 'cors'


 
const whitelist = [process.env.FRONTEND_ORIGIN,undefined]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))    
    }
  }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import {connectDB} from './DB/connection.js'
import { authenticationMiddleware } from './middlewares/authenticat.middleware.js';
import { Note } from './DB/models/note.js';

// const socketConnections = new Map()
export const bootstrap = async ()=>{
    const app = express()
    app.use(express.json())
    app.use(cors(corsOptions))
    routerHandeller(app)
    connectDB() 



   const server= app.listen(process.env.PORT,()=>{ 
        console.log(`server runs on ${process.env.PORT}!`);
        
    })
    const io = new Server(server,{
      cors: "*" 
    });

    io.on('connection', (socket) => {
      socket.on('add',async(data)=>{
        await Note.insertMany(data)

        const notes = await Note.find().select('-__v -createdAt -updatedAt -_id')
        io.emit('allNotes',notes)
        
      })
socket.on('load',async()=>{ 
  const notes = await Note.find().select('-__v -createdAt -updatedAt -_id')
        io.emit('allNotes',notes)
  
})


    });




  }






  
