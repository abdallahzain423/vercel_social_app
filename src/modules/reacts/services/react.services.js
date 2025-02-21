import { reacts } from "../../../constants/constant.js"
import { Post } from "../../../DB/models/posts.model.js"
import { React } from "../../../DB/models/reacts.model.js"


export const addReact = async(req,res)=>{
    const{reactType,onModel} = req.body
    const {reactOnId} = req.params
    const {_id:ownerId} = req.loggedInUser

    // check on model
    if(onModel =='Post'){
        const post = await Post.findById(reactOnId)
        if(!post) return res.status(404).json({msg:'post not found'})
    }else if(onModel == 'Comment'){
const comment = await Comment.findById(reactOnId)
if(!comment) return res.status(404).json({msg:'comment not found'})
    }

    // check react type
    if(!Object.values(reacts).includes(reactType)) return res.status(404).json({msg:'invalid react type'})

        // craete raect
        const newReact = await React.create({
            reactType,
            onModel,
            reactOnId,
            ownerId
        })

        return res.status(200).json({msg:'react added successfully',newReact})



}

// @delete react
export const deleteReact = async (req,res)=>{
    const {reactId}= req.params
    const{_id:ownerId}= req.loggedInUser

    const deleateReacts =await React.findOneAndDelete({
        _id:reactId,
        ownerId
    })
    return res.status(200).json({msg:'react deleted successfully',deleateReacts})
}