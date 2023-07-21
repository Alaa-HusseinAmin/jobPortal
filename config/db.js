import mongoose from "mongoose";

// const connectDB = async ()=>{
// try{
//     const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL)
//     console.log(`Connected To Mongodb Database ${mongoose.connection.host}`
//     );
// }catch(error){
//     console.log(`MongoDB Error ${error}`);
// }
// }

// export default connectDB

export default function dbConnection() {
    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_mongodb').then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('ERORR ', err);
    })
}