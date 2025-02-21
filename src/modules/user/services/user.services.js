import { cloudinary } from '../../../Config/cloudinary.config.js'
import {User} from '../../../DB/models/user.model.js'
import { encryption } from '../../../utils/encryption.js'




 export const test = async(req,res)=>{
try {
    const {username,phone} = req.body
    const hashedPhone = await encryption({value:phone,secretKey:process.env.SECRET_kEY})

    const user = await User.create({username,phone:hashedPhone})

    return res.status(200).json({msg:'done',user})
    
} catch (error) {
    console.log('error from services',error);
    return res.status(500).json({msg:'eror'})
    
    
}
 }

//  export const uploadProfilePicture = async(req,res)=>{
//     res.status(200).json({msg:'profile pic uploaded',uploadedFile:req.files})
//  }


export const uploadProfilePicture =async(req,res)=>{
    const {file} = req
    const {_id} =req.headers
    if(!file) return res.status(400).json({msg:'send the file please'})

    
    const url = `${req.protocol}://${req.headers.host}/${file.path}`
    const user = await User.findByIdAndUpdate(_id,{profilepicture:url},{new:true})

    res.status(200).json({msg:'profile pic >>',user})
}

export const uploadeCoverPicture = async (req,res)=>{
    const{files} = req
    const{_id} = req.headers
    if(!files?.length) return res.status(400).json({msg:'no file uploaded'})


    const imgs = files.map(file=>`${req.protocol}://${req.headers.host}/${file.path}`)
    const user = await User.findByIdAndUpdate( _id,{coverpicture:imgs},{new:true})
    res.status(200).json({msg:'cover pic uploaded',user})
}
    

export const uploadPicCloud = async(req,res)=>{

    const{file} = req
    const{_id} = req.headers
    if(!file) return res.status(400).json({msg:'no file uploaded'})

     const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{folder:`${process.env.CLOUDINARY_FOLDER}/user/profile`})

     const user = await User.findByIdAndUpdate(_id,{profilepicture:secure_url,public_id},{new:true})

     
    return res.status(200).json({msg:'donee',user }
        
    )
}
    
