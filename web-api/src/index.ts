import express from 'express';
import session from 'express-session';
import errorHandler from './error';
import config from './config';
import schedulesResource from './resource/schedules_resource';
import signinResource from './resource/signin_resource';
import companiesResource from './resource/companies_resource';
import managementResource from './resource/management_resource';
const app: express.Express = express();

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    user_id: string;
    signin_id: string;
    pass: string;
  }
}

export const sessionOpt = {
  secret: 'secret',
  cookie: {maxAge: 60 * 60 * 1000},
};

app.use(session(sessionOpt));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CROS対応（とりあえず全許可）
app.use(
    (req: express.Request,
        res: express.Response,
        next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    },
);

app.listen(config.port, () => {
  console.log('Start on port ' + config.port + '.');
});

app.use(config.apiBasePath + '/schedules', schedulesResource);

app.use(config.apiBasePath + '/signin', signinResource);

app.use(config.apiBasePath + '/companies', companiesResource);

app.use('/management', managementResource);

// eslint-disable-next-line
app.use(errorHandler);
