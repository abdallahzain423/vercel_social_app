
// systm role
export const systemRole ={
        ADMIN:'admin',
        USER:'user',
        GUEST:'guest'

}
// compined roles to be used in routers
const {ADMIN,USER,GUEST} = systemRole

export const ADMIN_USER = [ADMIN,USER]
export const GUEST_USER = [GUEST]
export const  ADMIN_GUEST = [ADMIN,GUEST]
export const  ADMIN_USER_GUEST = [ADMIN,USER,GUEST]
// gender
export const genderEnum ={
    MALE:'male',
    FEMALE:'female',
    NOT_SPECIFIED:'notspecified'
}
// providers
export const providersEnum ={
    GOOGLE:'google',
    FACEBOOK:'facebook',
    SYSTEM:'system'
}

//extentions
export const ImageExtentions = ['image/jpg','image/jpeg','image/png']
export const VideoExtentions = ['video/mp4','video/avi','video/mov']
export const DocumentExtentions = ['application/pdf','application/json','application/']

// reacts
export const reacts ={
    LIKE:'like' ,
     LOVE:'love' ,
      HAHA :'haha',
       WOW: 'wow' ,
        SAD: 'sad' ,
         ANGRY:'angry'
}


