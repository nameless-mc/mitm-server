import express from 'express';

import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from '../service/companies_service';
import {checkSessionAndGetUser} from '../service/users_service';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next) => {
  let user;
  try {
    user = await checkSessionAndGetUser(req.session);
  } catch (e) {
    return next(e);
  }
  const companies = await getCompanies(user);
  const data = companies.map((c) => {
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
});


router.post('/', async (req: express.Request, res: express.Response, next) => {
  let user;
  try {
    user = await checkSessionAndGetUser(req.session);
  } catch (e) {
    return next(e);
  }

  try {
    const company = await createCompany(user, {
      name: req.body.name,
      industry: req.body.industry,
      status: req.body.status,
      url: req.body.url,
      note: req.body.note,
    }).catch((e) => {
      throw next(e);
    });

    res.send({
      id: company.id,
      name: company.name,
      industry: company.industry,
      status: company.status,
      url: company.url,
    });
  } catch (e) {
    next(e);
  }
});

router.get(
    '/:companyId',
    async (req: express.Request, res: express.Response, next) => {
      const companyId = req.params.companyId;
      let user;
      try {
        user = await checkSessionAndGetUser(req.session);
      } catch (e) {
        return next(e);
      }
      const company = await getCompany(user, companyId);

      res.send({
        id: company.id,
        name: company.name,
        industry: company.industry,
        status: company.status,
        url: company.url,
      });
    },
);

router.put(
    '/:companyId',
    async (req: express.Request, res: express.Response, next) => {
      const companyId = req.params.companyId;
      let user;
      try {
        user = await checkSessionAndGetUser(req.session);
      } catch (e) {
        return next(e);
      }
      try {
        const company = await updateCompany(user, {
          id: parseInt(companyId),
          name: req.body.name,
          industry: req.body.industry,
          status: req.body.status,
          url: req.body.url,
          note: req.body.note,
        });

        res.send({
          id: company.id,
          name: company.name,
          industry: company.industry,
          status: company.status,
          url: company.url,
        });
      } catch (e) {
        return next(e);
      }
    },
);

router.delete(
    '/:companyId',
    async (req: express.Request, res: express.Response, next) => {
      const companyId = req.params.companyId;
      let user;
      try {
        user = await checkSessionAndGetUser(req.session);
      } catch (e) {
        return next(e);
      }
      try {
        await deleteCompany(user, companyId);
        res.status(204).send();
      } catch (e) {
        return next(e);
      }
    },
);
export default router;
