import * as mysql from 'promise-mysql';
import config from './config';

const connection = async () => {
  return await mysql.createConnection(config.db);
};

export default connection;

export const idgen = () => {
  return Date.now() - 1652242300000 + Math.floor(Math.random() * 1000);
};

export const clearDB = async () => {
  const deleteQuery = await connection().then((c) => {
    return c.query(
      "SELECT GROUP_CONCAT(CONCAT('TRUNCATE TABLE ',table_name,';') SEPARATOR ' ') AS statement" +
        ' FROM information_schema.tables' +
        " WHERE table_schema = 'mitm'"
    );
  });
  if (deleteQuery[0].statement) {
    await connection().then(async (c) => {
      await c.query('set foreign_key_checks = 0');
      await c.query(deleteQuery[0].statement);
      await c.query('set foreign_key_checks = 1');
      await c.end();
    });
  }
  console.log('clear db data');
};
