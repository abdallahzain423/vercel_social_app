import mongoose from 'mongoose'


export const commentSchema = new mongoose.Schema({
    content: String,
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true},
    tags:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User', 
            required: true
        },
        images:{
            URLS :[{
                secure_url:String,
                public_id:String
            }],
            folderId: String
        },
        commentOnId:{
            type:mongoose.Schema.Types.ObjectId,
            refPath:'onModel',required:true,
        },
        onModel:{
            type:String,
            enum:['Post','Comment']
        }
    
},{timestamps:true})



export const Comment = mongoose.models.Comment || mongoose.model('Comment',commentSchema)