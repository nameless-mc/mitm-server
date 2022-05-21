import {Session, SessionData} from 'express-session';
import {Connection} from 'promise-mysql';
import connection from '../db';
import {badRequestException, forbiddenException} from '../error';

export interface User{
    id: Number;
    name: string;
    signinId: string;
    pass: string;
}

export const getUsersToSignin =
    async (signinId: string, pass: string):Promise<User> => {
      const users = await connection().then((c: Connection) => {
        const result = c.query(
            'select * from users u' + ' where u.signin_id = ? and u.pass = ?',
            [signinId, pass],
        );
        c.end();
        return result;
      });
      if (!users || users.length == 0) {
        throw badRequestException('400 Bad Request', 'InvalidParameter');
      }
      const user = users[0];
      return {
        id: user.id,
        name: user.name,
        signinId: user.signin_id,
        pass: user.pass,
      };
    };

export const checkSessionAndGetUser = async (
    sessin: Session & Partial<SessionData>,
): Promise<User> => {
  const users = await connection().then((c: Connection) => {
    const result = c.query('select * from users u where u.id = ?', [
      sessin.user_id,
    ]);
    c.end();
    return result;
  });
  if (!users || users.length == 0) {
    throw forbiddenException();
  }
  const user = users[0];
  if (user.signin_id != sessin.signin_id || user.pass != sessin.pass) {
    throw forbiddenException();
  }
  return {
    id: user.id,
    name: user.name,
    signinId: user.signin_id,
    pass: user.pass,
  };
};
