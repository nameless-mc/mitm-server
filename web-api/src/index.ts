import express from 'express';
import errorHandler from './error';
import config from './config';
const app: express.Express = express();
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

// eslint-disable-next-line
app.use(errorHandler);
