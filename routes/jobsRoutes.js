import express from "express";
import { createJobController, deleteJobController, getAllJobsController, jobStatusController, updateJobController } from "../controller/jobsController.js";
import userAuth from './../middlewares/authMiddleware.js';

const router = express.Router()

//routes
//CREATE JOB || POST
router.post('/create-job',userAuth,createJobController)

// GET JOBS || GET
router.get('/get-job',userAuth,getAllJobsController)

//UPDATE JOBS || PUT PATCH
router.patch("/update-job/:id",userAuth,updateJobController)

//Delete JOBS || Delete
router.delete("/delete-job/:id",userAuth,deleteJobController)

//JOBS STARTS FILTER || GET
router.get("/job-status",userAuth,jobStatusController)






export default router