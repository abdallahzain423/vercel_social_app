import jwt from 'jsonwebtoken'


export const generateToken =({
    publicClaims,
    regiteredClaims,
    secretKey = process.env.JWT_SECRET_KEY
}) =>{
    return jwt.sign(publicClaims,secretKey,regiteredClaims)
}

// verify jwt

export const verifyToken =({token,secretKey=process.env.JWT_SECRET_KEY})=>{
    return jwt.verify(token,secretKey)
}