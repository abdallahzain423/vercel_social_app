/**
 * @create post 
 * 
 */

import { cloudinary } from "../../../Config/cloudinary.config.js"
import { Post } from "../../../DB/models/posts.model.js"
import { User } from "../../../DB/models/user.model.js"
import { v4 as uuidv4 } from 'uuid'
import { pagination } from "../../../utils/pagination-utils.js"

export const addPostService = async(req,res)=>{
    const {_id:ownerId} = req.loggedInUser
    const {title,description,allowComments,tags} = req.body
    const postObject = {
        title,
        description,
        ownerId,
        allowComments,
        tags
    }
  
// check tags include valid user id



//images 
let images = null
if(req.files?.length){
    const folderId = uuidv4().slice(0,4)
    images ={
        URLS:[],
        folderId
    }

    for(const file of req.files){
        const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{
            folder:`${process.env.CLOUDINARY_FOLDER}/posts/${folderId}`
        })
        images.URLS.push({secure_url,public_id})
    }
    postObject.images= images
  
}




// if(images){
//     postObject.images = images
// }
// if(tags?.length){
//     postObject.tags= tags
// }
// craete post
const post =  await Post.create(postObject)
return res.status(200).json({msg:'post created successfull',post})






}

export const listPosts = async(req,res)=>{
    const{limit ,page } = req.query
    //============================================pagination 2==========================    
    // const skip = (page -1) * limit
    // const posts = await Post.find().populate( [
    //     {
    //         path:'Comments'
    //     }
    // ])

    // const {skip,limit:lim} = pagination({page,limit}) 

    //==============================pagination 1 ==============================

    const posts = await Post.paginate({},{ 
        limit,
        page,
        sort:{createdAt:-1}, 
        populate:[
            {
                path:'Comments'
            }
        ],
        customLabels:{
            totalDocs:'totalPosts',
            docs:'posts'
        }
    })

    return res.status(200).json({posts})
}



