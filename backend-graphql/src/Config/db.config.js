// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// dotenv.config();
// 
// mongoose.connect(
  // process.env.MONGOATLAS_URI,
  // (err)=>{
    // if(err){
        // console.log('error al conectar MONGODB 😢')  
// 
    // }else{
// 
        // console.log('conectado correctamente MONGODB 😇')
    // }
  // }
// );
// export default mongoose
// 
const Config = {
  db: {
      name: 'ecommerce',
      cnxStr: 'mongodb+srv://isaico:isaias159@cluster0.ai4r7.mongodb.net/',
      projection: {__v:0}
  }
}

export default Config