import express from 'express';
import {getSchedules} from '../service/schedules_service';
import {checkSessionAndGetUser} from '../service/users_service';

// eslint-disable-next-line new-cap
const router=express.Router();
// eslint-disable-next-line new-cap
router.get('/', async (req:express.Request, res:express.Response, next)=>{
  let user;
  let schedules;
  try {
    user = await checkSessionAndGetUser(req.session);
    schedules = await getSchedules(user);
  } catch (e) {
    return next(e);
  }
  res.send({schedule: schedules});
});

router.get('/:id', async (req:express.Request, res:express.Response, next)=>{
  let user,schedules;
  const id=req.params.id;
  try {
    user = await checkSessionAndGetUser(req.session);
    schedules = await getSchedules(user);
  } catch (e) {
    return next(e);
  }
  res.send({schedule: schedules});
});

export default router;
