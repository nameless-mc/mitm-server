import express from 'express';
import {checkSessionAndGetUser} from '../service/users_service';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/check_session',
    async (req: express.Request, res: express.Response, next) => {
      let user;
      try {
        user = await checkSessionAndGetUser(req.session);
      } catch (e) {
        return next(e);
      }
      res.send(user);
    });

export default router;
