import express from 'express';
import {
  getUsersToSignin,
} from '../service/users_service';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response, next) => {
  const signinId = req.body.id;
  const pass = req.body.pass;
  let user;
  try {
    user = await getUsersToSignin(signinId, pass);
  } catch (e) {
    return next(e);
  }
  req.session.user_id = user.id.toString();
  req.session.signin_id = user.signinId;
  req.session.pass = user.pass;
  req.session.save();
  res.send();
});

export default router;
