import {Connection} from 'promise-mysql';
import connection, {idgen} from '../db';
import {badRequestException, notFoundException} from '../error';
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

export const getCompanies = async (user: User): Promise<Company[]> => {
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

export const getCompany = async (
    user: User,
    companyId: string,
): Promise<Company> => {
  const companies = await connection().then((c: Connection) => {
    const result = c.query(
        'select * from companies c where c.user_id = ? and c.id = ?',
        [user.id, companyId],
    );
    c.end();
    return result;
  });
  if (!companies || companies.length == 0) {
    throw notFoundException('company not found', 'COMPANY');
  }
  const c = companies[0];
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
};

export const createCompany = async (
    user: User,
    data: {
    name: string;
    industry?: string;
    status?: string;
    url?: string;
    note?: string;
  },
): Promise<Company> => {
  const company: Company = {
    id: idgen(),
    userId: user.id,
    user: user,
    name: data.name,
    industry: data.industry,
    status: data.status,
    url: data.url,
    note: data.note,
  };
  const res = await connection().then((c: Connection) => {
    return c
        .query(
            'insert into companies' +
          '(id, user_id, name, industry, status, url, note)' +
          ' values(?, ?, ?, ?, ?, ?, ?)',
            [
              company.id,
              company.user?.id,
              company.name,
              company.industry,
              company.status,
              company.url,
              company.note,
            ],
        )
        .catch(() => {
          return badRequestException();
        });
    c.end();
  });
  if (res instanceof Error) {
    throw badRequestException();
  }
  return company;
};

export const updateCompany = async (
    user: User,
    data: {
    id: Number;
    name: string;
    industry?: string;
    status?: string;
    url?: string;
    note?: string;
  },
): Promise<Company> => {
  const oldData = await getCompany(user, data.id.toString());
  const company: Company = {
    id: data.id,
    userId: user.id,
    user: user,
    name: data.name || oldData.name,
    industry: data.industry || oldData.industry,
    status: data.status || oldData.status,
    url: data.url || oldData.url,
    note: data.note || oldData.note,
  };
  const res = await connection().then((c: Connection) => {
    return c
        .query(
            'update companies c set ' +
          'c.id = ?, c.user_id = ?, c.name = ?, c.industry = ?' +
          ', c.status = ?, c.url = ?, c.note = ?' +
          ' where c.id = ?',
            [
              company.id,
              company.user?.id,
              company.name,
              company.industry,
              company.status,
              company.url,
              company.note,
              company.id,
            ],
        )
        .catch(() => {
          return badRequestException();
        });
  });
  if (res instanceof Error) {
    throw badRequestException();
  }
  return company;
};
