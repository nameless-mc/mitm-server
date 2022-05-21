import express from "express";
import connection,{idgen} from "../db";
import { badRequestException, notFoundException } from "../error";
import { getSchedules } from "../service/schedules_service";

const router=express.Router();
router.get("/",async (req:express.Request,res:express.Response)=>{
    const schedules=await getSchedules();
    res.send({schedule:schedules});
});

export default router;