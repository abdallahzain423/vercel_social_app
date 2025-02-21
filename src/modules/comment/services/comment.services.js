import { cloudinary } from "../../../Config/cloudinary.config.js"
import { Comment ,Post, User} from "../../../DB/models/index.js"

import { v4 as uuidv4 } from 'uuid'


export const addComment =async(req,res)=>{
    const {_id:ownerId} = req.loggedInUser
   
    
    const{content,tags,onModel}= req.body
    const {commentOnId} = req.params  

    // comment object
    const commentObject ={
        content,
        ownerId,
        tags,
 
    }

    //check mentions


    // check on model  ==> on post  oncomment
    if(onModel == 'Post'){
        const post = await Post.findOne({_id:commentOnId,allowComments:true}) 
        console.log('owner id>>',ownerId,post);
        
        if(!post) return res.status(401).json({msg:'post not found or comment not allow'})

            // commentObject.commentOnId = commentOnId
            // commentObject.onModel = onModel
    }


    else if(onModel == 'Comment'){
        const comment = await Comment.findOne({_id:commentOnId})
        if(!comment) return res.status(401).json({msg:'comment not found '})

            //  commentObject.commentOnId = commentOnId
            // commentObject.onModel = onModel
    }

     commentObject.commentOnId = commentOnId
     commentObject.onModel = onModel

     // check files 
     if(req.files?.length){
        const folderId = uuidv4().slice(0,4)
      let  images ={
            URLS:[],
            folderId
        }
    
        for(const file of req.files){
            const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{
                folder:`${process.env.CLOUDINARY_FOLDER}/posts/${folderId}`
            })
            images.URLS.push({secure_url,public_id})
        }
        commentObject.images= images
      
    }

    const comment = await Comment.create(commentObject) 
    res.status(200).json({comment})

}

export const listComments =async(req,res)=>{ 
    const comments = await Comment.find().populate('commentOnId')
    console.log('comments>>',comments);
    
    res.status(200).json({comments}) 
}