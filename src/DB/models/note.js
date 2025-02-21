import mongoose from 'mongoose'
const noteSchema = new mongoose.Schema({
    name:String,
    description:String, 
}, {timestamps:true})

export const Note = mongoose.models.Note || mongoose.model('Note',noteSchema)





