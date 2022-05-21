import express from "express";
import connection,{idgen} from "../db";
import { badRequestException, notFoundException } from "../error";
import { getSchedules } from "../service/schedules_service";
import { checkSessionAndGetUser } from "../service/users_service";

const router=express.Router();
router.get("/",async (req:express.Request,res:express.Response,next)=>{
    let user;
    try {
        user = await checkSessionAndGetUser(req.session);
    } catch (e) {
        return next(e);
    }
    const schedules=await getSchedules(user);
    res.send({schedule:schedules});
});

export default router;