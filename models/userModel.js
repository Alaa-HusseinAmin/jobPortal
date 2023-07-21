import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import mongoose from "mongoose"
import validator from "validator"
//schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,`Name Is Required`]
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,`Email is Require`],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'password is require'],
        minlength:[6,"Password length should be greater than 6 character"],
        select:true,
    },
    location:{
        type:String,
        default:'Egypt'
    },
},
{timestamps:true}
)
//middlewares
userSchema.pre('save',async function(){
    if(!this.isModified) return
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

//compare password
userSchema.method.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch
}
//JSON WEBTOKEN
userSchema.method.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:"id"})
}
export default mongoose.model('User',userSchema)
