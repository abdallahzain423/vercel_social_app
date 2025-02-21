// import multer from 'multer'
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid'

// export const Multer =(destinationPath= 'general',allowedExtention = [])=>{
//     const destinationFolder = `Assets/${destinationPath}`
//     if(!fs.existsSync(destinationFolder)) { 
//         fs.mkdirSync(destinationFolder,{recursive:true})
//     }
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, destinationFolder)
//         },
//         filename: function (req, file, cb) {
//           // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  
//           const uniqueSuffix = uuidv4()
//           const unidate = Date.now()
//           console.log(unidate);
          
 
//           cb(null, `${unidate}_${uniqueSuffix}_${file.originalname}` ) 
//         }
// })


// const fileFilter = (req, file, cb)=> {
//   if(allowedExtention.includes(file.mimetype)){

//     cb(null, false)

//   }else{

//     cb(new Error('I don\'t have a clue!'))
//   }

// }


// const upload = multer({ storage: storage }) 
// return upload
// }


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import multer from 'multer'
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'

export const multerLocal =(destinationPath='general',allowedExtentions=[])=>{
  const destinationFolder =`Assets/${destinationPath}`
  if(!fs.existsSync(destinationFolder)){
    fs.mkdirSync(destinationFolder,{recursive:true})
  }

  const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, destinationFolder)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

//=====================file filter===========//
const fileFilter = (req, file, cb)=> {
  if(allowedExtentions.includes(file.mimetype)){

    cb(null, false)

  }else{

    cb(new Error('I don\'t have a clue!'))
  }

}



  
  const upload = multer({filename:fileFilter, storage: storage })
  return upload

}


export const multerHost =(allowedExtentions =[])=>{
  const storage = multer.diskStorage({})

  //=====================file filter===========//
const fileFilter = (req, file, cb)=> {
  if(allowedExtentions.includes(file.mimetype)){

    cb(null, false)

  }else{

    cb(new Error('I don\'t have a clue!'))
  }
}
const upload = multer({filename:fileFilter, storage: storage })
return upload


}

