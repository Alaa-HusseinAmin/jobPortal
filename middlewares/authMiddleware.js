import JWT from "jsonwebtoken"

const userAuth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startWith('Bearer')){
        next('Auth Failed')
    }
    const token = authHeader.spilt(' ')[1]
   try{
     const payload = JWT.verify(token,process.env.JWT_SECRET)
     req.body.user = {userId: payload.userId}
     next()
    }catch (error){
    next('Auth Failed')
   }
}

export default userAuth;