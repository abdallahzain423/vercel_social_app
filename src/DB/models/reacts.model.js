import mongoose from 'mongoose'
import { reacts } from '../../constants/constant.js'

export const reactSchema = new mongoose.Schema({
    reatsOnId:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        require:true
    },
    onModel:{
        type:String,
        enum:['Post','Comment']
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    reactType:{
        type:String,
        enum: Object.values(reacts)
    }
},{timestamps:true})


export const React = mongoose.models.React || mongoose.model('React',reactSchema)





