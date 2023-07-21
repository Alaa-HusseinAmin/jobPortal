//Api Documentation
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//package imports
import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import "express-async-errors";
import morgan from 'morgan';
//security packages
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
//files imports
import connectDB from "./config/db.js";
//routes import
import errorMiddelware from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
//Dot ENV config;
dotenv.config()


//mongodb connection
connectDB()

//Swagger api config
//swagger api option
const options ={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Job Portal Application",
            description:"Node Expressjs Job Portal Application",
        },
        servers:[
            {
                url:"http:/localhost:3000",
            },
        ],
    },
    apis:["./routes/*.js"],
    };

    const spec = swaggerDoc(options)
    
//rest object
const app = express();


//middelwares

app.use(helmet());
app.use(xss())
app.use(express.json());
app.use(cors())
app.use(mongoSanitize())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/test',testRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/job",jobsRoutes)

//homeroute root
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec))

//validation middleware
app.use(errorMiddelware)

//port
const PORT = process.env.PORT || 3000
//listen
app.listen(PORT,()=>{
    console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
    );
})