import express from 'express';
import {getSchedules} from '../service/schedules_service';
import {checkSessionAndGetUser} from '../service/users_service';

// eslint-disable-next-line new-cap
const router=express.Router();
// eslint-disable-next-line new-cap
router.get('/', async (req:express.Request, res:express.Response, next)=>{
  let user;
  try {
    user = await checkSessionAndGetUser(req.session);
  } catch (e) {
    return next(e);
  }
  const schedules=await getSchedules(user);
  res.send({schedule: schedules});
});

export default router;
