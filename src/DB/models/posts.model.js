

import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

 const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    ownerId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tags :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    allowComments:{type:Boolean,default:true},
    images:{
        URLS :[{
            secure_url:String,
            public_id:String
        }],
        folderId: String
    }
},{timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}

})

// virtual comments
postSchema.virtual('Comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'commentOnId'
   
  })
  // paginatation plugin
  postSchema.plugin(mongoosePaginate)

  



export const Post = mongoose.models.Post || mongoose.model('Post',postSchema)