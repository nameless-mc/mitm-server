import * as mysql from 'promise-mysql';
import config from './config';

const connection = async () => {
  return await mysql.createConnection(config.db);
};

export default connection;

export const idgen = () => {
  return Date.now() - 1652242300000 + Math.floor(Math.random() * 1000);
};
