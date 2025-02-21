import { User } from "../DB/models/index.js"


export const checkIfUserExist = async(req,res,next)=>{
    let tags = req.body.tags
    if(tags && !Array.isArray(tags)){ 
        tags = [tags]
    }

    if(tags?.length){
        const users = await User.find({_id:{$in:tags}})
        if( tags.length !== users.length){
            console.log(tags.length);
            console.log(users.length);
            
            return res.status(401).json({msg:'not valid tags'})

        }
    }
    next()
}