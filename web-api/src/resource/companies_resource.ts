import express from 'express';
import {getCompanies} from '../service/companies_service';
import {checkSessionAndGetUser} from '../service/users_service';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(
    '/',
    async (req: express.Request, res: express.Response, next) => {
      let user;
      try {
        user = await checkSessionAndGetUser(req.session);
      } catch (e) {
        return next(e);
      }
      const companies = await getCompanies(user);
      const data =companies.map((c) => {
        return {
          id: c.id,
          name: c.name,
          industry: c.industry,
          status: c.status,
          url: c.url,
        };
      });
      res.send({
        companies: data,
      });
    },
);

export default router;
