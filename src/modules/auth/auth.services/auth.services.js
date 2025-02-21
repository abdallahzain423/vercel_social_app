import { User } from "../../../DB/models/user.model.js"
import bcrypt, { compareSync, hashSync } from 'bcrypt'
import { encryption } from "../../../utils/encryption.js"
import { v4 as uuidv4 } from 'uuid';
import { emitter } from "../../../Email/sendEmail.services.js";
import { generateToken } from "../../../utils/token.utils.js";
import {OAuth2Client} from 'google-auth-library'
import { providersEnum } from "../../../constants/constant.js";



export const signUpServices = async(req,res,next)=>{

    const{username,email,password,phone,gender,DOB,privateaccount} = req.body
    // check email
    const isEmailExist = await User.findOne({email})
    if (isEmailExist)  return res.status(400).json({msg:'this email is already exist'})
    // hash password
    const hashedPaswword = bcrypt.hashSync(password,+process.env.SALT)

    //encryption phone
    const encrypedPhone = await encryption({value:phone,secretKey:process.env.SECRET_kEY})
    // private account
   
    // const isPublic = privateaccount?false:true 

    // confirm otp
    const otp = uuidv4().slice(0,4)
    const hashedOtp = bcrypt.hashSync(otp,+process.env.SALT)

    //send email
    emitter.emit('sendEmail',{
        to:email,
        subject:'verify your email',
        html:`<h1>${otp}</h1>`
    })

    // create user
    const user = new User({
        username,
        email,
        password:hashedPaswword,
        phone : encrypedPhone,
        gender,
        DOB,
        isPublic:!privateaccount ,
        confirmOtp:hashedOtp 
    })
    await user.save()

    
    
    res.status(201).json({msg:"user created successfully"}) 
}

export const confirmEmailService = async(req,res)=>{
    const {email,otp} = req.body
    const user = await User.findOne({email,isverified:false,confirmOtp:{$exists:true}})
    if(!user) return res.status(401).json({msg:'user not found'})
    const isOtpMatched = compareSync(otp,user.confirmOtp)
    if(!isOtpMatched) return res.status(400).json({msg:'incorrect otp'})

    await User.findByIdAndUpdate(user._id,{isverified:true,$unset:{confirmOtp:""} })
    return res.status(200).json({msg:'email confirmed successfully'})
    

}


export const signInServices = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email,isverified:true})
    if(!user) return res.status(402).json({msg:'user not found'})
    const isPasswordMatched = compareSync(password,user.password)
    if(!isPasswordMatched) return res.status(401).json({msg:'user not found'})

    // access token
    const accesstken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.ACCESSTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY
    })
    // rfrsh token
    const refreshtken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.REFRESHTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY_REFRESH
    })
    return res.status(200).json({msg:'signed in successfully',accesstken,refreshtken})

    
}
//========================================= sign in with gmail =====================//

export const GmailLoginServices = async (req,res)=>{
    const {idToken} = req.body
const client = new OAuth2Client();


  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,  
  
  });
  const payload = ticket.getPayload();
  const{email_verified,email} = payload
  //================ check email_verified && provider ======//
  if(!email_verified) return res.status(401).json({msg:'user not found'})

    const user = await User.findOne({email,provider:providersEnum.GOOGLE})
    if(!user) return res.status(401).json({msg:'user not found'})

    //============= access token================
    const accesstken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.ACCESSTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY
    })
    //============= rfrsh token ==============//
    const refreshtken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.REFRESHTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY_REFRESH
    })

    return res.status(200).json({msg:'signed in successfully',accesstken,refreshtken})
    

}

//======================= sign up with gmail =============//

export const GmailRegisterService = async(req,res)=>{
    const {idToken} = req.body
    const client = new OAuth2Client();
    
    
      const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.CLIENT_ID,  
      
      });
      const payload = ticket.getPayload();
      const{email_verified,email,name} = payload
      if(!email_verified) return res.status(401).json({msg:'user not found'})
    
        // craete user
        const user = new User({
            username:name,
            email:email,
            email_verified:true,
            provider:providersEnum.GOOGLE,
            isverified:true,
            password: hashSync(uuidv4(),+process.env.SALT)
        })
        await user.save()
        return res.status(200).json({msg:'signed in successfully'}) 
}