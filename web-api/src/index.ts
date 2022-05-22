import express from 'express';
import session from 'express-session';
import errorHandler from './error';
import config from './config';
import schedulesResource from './resource/schedules_resource';
import signinResource from './resource/signin_resource';
import companiesResource from './resource/companies_resource';
import managementResource from './resource/management_resource';
const fs = require('fs');
const app: express.Express = express();

const server = require('https').createServer(
  {
    key: fs.readFileSync('./data/privatekey.pem'),
    cert: fs.readFileSync('./data/cert.pem'),
  },
  app
);

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
  cookie: {maxAge: 60 * 60 * 1000, SameSite: 'None'},
  secure: true,
};

app.use(session(sessionOpt));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);

// CROS対応
app.use(
    (req: express.Request,
        res: express.Response,
        next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', 'https://localhost:8080');
      res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
      res.header(
          'Access-Control-Allow-Headers',
          'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept',
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    },
);

app.use(config.apiBasePath + '/schedules', schedulesResource);

app.use(config.apiBasePath + '/signin', signinResource);

app.use(config.apiBasePath + '/companies', companiesResource);

app.use('/management', managementResource);

// eslint-disable-next-line
app.use(errorHandler);

server.listen(config.port, () => {
  console.log('Start on port ' + config.port + '.');
});