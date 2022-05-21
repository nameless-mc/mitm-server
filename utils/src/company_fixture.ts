import { Connection } from 'promise-mysql';
import connection, { idgen } from './db';
import UserFixture, { User } from './user_fixture';

export interface Company {
  id: Number;
  user?: User;
  name: string;
  industry?: string;
  url?: string;
  note?: string;
  status?: string;
}

export default class CompanyFixture {
  private company: Company = {
    id: idgen(),
    name: '',
  };

  public id(id: number): CompanyFixture {
    this.company.id = id;
    return this;
  }

  public name(name: string): CompanyFixture {
    this.company.name = name;
    return this;
  }

  public user(user: User): CompanyFixture {
    this.company.user = user;
    return this;
  }

  public industry(industry: string): CompanyFixture {
    this.company.industry = industry;
    return this;
  }

  public url(url: string): CompanyFixture {
    this.company.url = url;
    return this;
  }

  public note(note: string): CompanyFixture {
    this.company.note = note;
    return this;
  }

  public status(status: string): CompanyFixture {
    this.company.status = status;
    return this;
  }

  public async build(): Promise<Company> {

    await connection().then((c: Connection) => {
      c.query(
        'insert into companies(id, user_id, name, industry, status, url, note) values(?, ?, ?, ?, ?, ?, ?)',
        [
          this.company.id,
          this.company.user?.id,
          this.company.name,
          this.company.industry,
          this.company.status,
          this.company.url,
          this.company.note,
        ]
      );
      c.end();
    });
    return this.company;
  }

  public static async build(company: Company): Promise<Company> {
    const fixture = new CompanyFixture();
    fixture.company = company;
    return await fixture.build();
  }
}
