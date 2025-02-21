import mongoose from 'mongoose'

import { systemRole ,genderEnum ,providersEnum} from '../../constants/constant.js'
import { type } from 'os'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, 'user name is require'] 
    },
    email:{
        type:String,
        require:true

    },
    password:{
        type:String,
        require:true 
    },
    phone:String,
    isDeactived:{
        type:Boolean,
        default:false
    },
    isverified:{
        type:Boolean,
        default:false
    },
    profilepicture:{
        secure_url:String,
        public_id:String
    },
    coverpicture: [{
        secure_url:String,
        public_id:String
    }],
    confirmOtp:String,
    forgetOtp:String,
    gender:{
        type:String,
        enum:Object.values(genderEnum),
        default:genderEnum.NOT_SPECIFIED
    },
    DOB:Date,
    isPublic:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        enum:Object.values(systemRole),
        default:systemRole.USER
    },
    provider:{
        type:String,
        enum:Object.values(providersEnum),
        default:providersEnum.SYSTEM
    }
},{timestamps:true})

export const User = mongoose.models.User || mongoose.model('User',userSchema)
