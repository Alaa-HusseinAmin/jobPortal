import express from "express"
import rateLimit from "express-rate-limit"
import { loginController, registerController } from "../controller/authController.js"


//ip limiter
const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max:100,
standardHeaders:true,
legacyHeaders:false,
})



//router object
const router = express.Router()


//error  



//routes
// /**
// * @swagger
// * components:
// * schemas:
// *      User:
// *         type:Object
// *         required:
// *             -name
// *             -lastName
// *             -email
// *             -password
// *        properties:
// *          id:-
// *            type:string
// *            description: The Auto-generated id of user collection
// *            example: Gtyuiop1234567dfghjk
//           name:-
// *            type:string
// *            description: User name
// *          lastName:-
// *            type:string
// *            description: User Last Name
// *          email:-
// *            type:string
// *            description: User email address
// *          password:-
// *            type:string
// *            description: User Password should be greater than 6 character
// *          location:-
// *            type:string
// *            description: User location city or country
// *          example:
//              id: Gtyuiop1234567dfghjk
//              name: Alaa
//              lastName: Hussein
//              email:Alaa@gmail.com
//              password: test@123
//              location:Egp
// */       

// /**
// *   @swagger
// *   tages:
// *       name:auth
// *       description: authentication api
// */

// /**
// *   @swagger
// *   /api/v1/auth/register:
// *       post:
// *         summary: register new user
// *          tages: [Auth]
// *          requestBody:
//            required: true
// *        content:
// *            application/json:
// *           schema:
// *               $ref:"#/components/schemas/User"
// *         responses:
// *              200:
// *               description: user created sucessfully
// *               content:
// *                 application/json
// *                 schema:
// *                   $ref:"#/components/schemas/User"  
// *               500:
// *                  description:internal server error
// *
// */

// /**
// *   @swagger
// *   /api/v1/auth/login:
// *       post:
// *         summary: login page
// *          tages: [Auth]
// *          requestBody:
//            required: true
// *        content:
// *            application/json:
// *           schema:
// *               $ref:"#/components/schemas/User"
// *          responses:
// *              200:
// *               description:  login successfully
// *               content:
// *                 application/json
// *                 schema:
// *                   $ref:"#/components/schemas/User"  
// *               500:
// *                  description:something wnt wrong
// *
// */



// REGISTER || POST
router.post('/register',limiter,registerController)

// LOGIN || POST
 router.post('/login',loginController)


//export
export default router