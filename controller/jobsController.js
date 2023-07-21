import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";
import moment from "moment"
//Create Jobs//
export const createJobController =async (req,res,next)=>{
    const {company,position}=req.body
    if(!company || !position){
        next('Please Provide All Fields')
    }
    req.body.createdBy=req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
}

//Get Jobs//
export const getAllJobsController = async (req,res,next)=>{
    const {status,workType,search,sort} = req.query
    //condition for searching filters
    const queryObject = {
        createdBy : req.user.userId
    }
    //logic filters
    if(status && status !== 'all'){
        queryObject.status = status
    }
    if(workType && workType !== 'all'){
        queryObject.workType = workType;
    }
    if(search){
        queryObject.position={$regex: search,$options:"i"}
    }

    let queryResult = jobsModel.find(queryObject);

    //sorting
    if(sort === "latest"){
        queryObject = queryResult.sort('-createdAt')
    }
    if(sort === "oldest"){
        queryObject = queryResult.sort('createdAt')
    }
    if(sort === "a-z"){
        queryObject = queryResult.sort('position')
    }
    if(sort === "z-a"){
        queryObject = queryResult.sort('-position')
    }
    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    queryResult = queryResult.skip(skip).limit(limit)
    //jobs count
    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs / limit)

    const jobs = await queryResult;

// const jobs = await jobsModel.find({createdBy:req.user.userId});
res.status(200).json({
    totalJobs,
    jobs,
    numOfPage
});
}

//UPDATE JOBS//
export const updateJobController = async(req,res,next)=>{
    const {id}=req.params
      const {company,position}=req.body
      //validation
      if(!company || !position){
        next('Please Provide All Fields')
      }
      //find job
      const job = await jobsModel.findOne({id:id})
      //validation
      if(!job){
        next(`no jobs found with this id ${id}`)
      }
      if(req.user.userId === job.createdBy.toString()){
        return
      }
      //res
      res.status(200).json({updateJob});
}

//Delete Jobs//
export const deleteJobController= async(req,res,next)=>{
const {id} = req.params
//find job
const job = await jobsModel.findOne({_id:id})
//validation
if(!job){
    next(`No Job Found With This Id ${id}`)
}
if(!req.user.user.userId === job.createdBy.toString()){
    next('You Are Not Authorize to delete this job')
    return
}
await job.deleteOne();
res.status(200).json({message:"Success, Job Deleted!"})
}

//JOBS STATUS & FILTERS//
export const jobStatusController= async(req,res)=>{
const status = await jobsModel.aggregate([
    //search by user jobs
    {
        $match:{
         createdBy: new mongoose.Types.ObjectId(req.user.userId)
        },
    },
        {
            $group:{
                _id:"$status",
                $count:{$sum:1}
        }

    }
])

//default status
const defaultStatus={
    pending:status.pending || 0,
    reject:status.reject||0,
    interview:status.interview||0
};
//monthly yearly status
let monthlyApplication = await jobsModel.aggregate([
    {
        $match:{
            createdBy:new mongoose.Types.ObjectId(req.user.userId)
        }
    },
    {
    $group:{
   _id:{
     year:{$year:"$createdAt"},
     month:{$month:"createdAt"}
},
count:{
    $sum:1
}
        }
    }
]);
monthlyApplication = monthlyApplication.map(item =>{
    const {_id:{year,month},count} = item
    const date = moment().month(month -1).year(year).format('MMM y')
    return {date,count}
})
.reverse ()
res.status(200).json({totalJob:status.length,defaultStatus})
}