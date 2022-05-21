import {Connection} from 'promise-mysql';
import connection from '../db';
import {User} from './users_service';

export interface Company {
  id: Number;
  userId: Number;
  user?: User;
  name: string;
  industry?: string;
  url?: string;
  note?: string;
  status?: string;
}

export const getCompanies = async (user: User):Promise<Company[]> =>{
  const companies = await connection().then((c: Connection) => {
    const result = c.query('select * from companies c where c.user_id = ?', [
      user.id,
    ]);
    c.end();
    return result;
  });
  return companies.map((c: any): Company => {
    return {
      id: c.id,
      userId: user.id,
      user: user,
      name: c.name,
      industry: c.industry,
      url: c.url,
      note: c.note,
      status: c.status,
    };
  });
};
