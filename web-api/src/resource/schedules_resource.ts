import express from 'express';
import {getSchedules,getScheduleById,createSchedule,deleteSchedule,updateSchedule} from '../service/schedules_service';
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
  let user,schedule;
  const id=req.params.id;
  try {
    user = await checkSessionAndGetUser(req.session);
    schedule = await getScheduleById(parseInt(id));
  } catch (e) {
    return next(e);
  }
  res.send(schedule);
});

router.post('/',async (req:express.Request,res:express.Response,next)=>{
  let user;
  try {
    user = await checkSessionAndGetUser(req.session);
  } catch (e) {
    return next(e);
  }

  try {
    const schedule = await createSchedule(user, {
      title: req.body.title,
      companyId: req.body.company_id,
      companyName: req.body.company_name,
      url:req.body.url,
      note: req.body.note,
      start: req.body.start,
      end: req.body.end
    }).catch((e) => {
      throw next(e);
    });

    res.send({
      id: schedule.id,
      title: schedule.title,
      company_id: schedule.company_id,
      company_name: schedule.company_name,
      url:schedule.url,
      note: schedule.note,
      start: schedule.start,
      end: schedule.end
    });
  } catch (e) {
    next(e);
  }
});



router.put(
  '/:scheduleId',
  async (req: express.Request, res: express.Response, next) => {
    const scheduleId = req.params.scheduleId;
    let user;
    try {
      user = await checkSessionAndGetUser(req.session);
    } catch (e) {
      return next(e);
    }
    try {
      const schedule = await updateSchedule(user, {
        id: parseInt(scheduleId),
        title: req.body.title,
        companyId: req.body.company_id,
        companyName: req.body.company_name,
        url:req.body.url,
        note: req.body.note,
        start: req.body.start,
        end: req.body.end
      });

      res.send({
        id: schedule.id,
        title: schedule.title,
        company_id: schedule.company_id,
        company_name: schedule.company_name,
        url:schedule.url,
        note: schedule.note,
        start: schedule.start,
        end: schedule.end
      });
    } catch (e) {
      return next(e);
    }
  },
);

router.delete(
  '/:scheduleId',
  async (req: express.Request, res: express.Response, next) => {
    const scheduleId = req.params.scheduleId;
    let user;
    try {
      user = await checkSessionAndGetUser(req.session);
    } catch (e) {
      return next(e);
    }
    try {
      await deleteSchedule(user, parseInt(scheduleId));
      res.status(204).send();
    } catch (e) {
      return next(e);
    }
  },
);

export default router;
