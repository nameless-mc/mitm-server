import { Connection } from 'promise-mysql';
import CompanyFixture, { Company } from './company_fixture';
import connection, { idgen } from './db';
import { User } from './user_fixture';

export interface Schedule {
  id: Number;
  user?: User;
  title?: string;
  company?: Company;
  url?: string;
  note?: string;
  date: Date;
}

export default class ScheduleFixture {
  private schedule: Schedule = {
    id: idgen(),
    title: 'title',
    date: new Date(),
  };

  public id(id: number): ScheduleFixture {
    this.schedule.id = id;
    return this;
  }

  public title(title: string): ScheduleFixture {
    this.schedule.title = title;
    return this;
  }

  public date(date: Date): ScheduleFixture {
    this.schedule.date = date;
    return this;
  }

  public user(user: User): ScheduleFixture {
    this.schedule.user = user;
    return this;
  }

  public company(company: Company): ScheduleFixture {
    this.schedule.company = company;
    this.schedule.user = company.user;
    return this;
  }

  public url(url: string): ScheduleFixture {
    this.schedule.url = url;
    return this;
  }

  public note(note: string): ScheduleFixture {
    this.schedule.note = note;
    return this;
  }

  public async build(): Promise<Schedule> {

    await connection().then((c: Connection) => {
      c.query(
        'insert into schedules(id, user_id, title, company_id, url, note, date) values(?, ?, ?, ?, ?, ?, ?)',
        [
          this.schedule.id,
          this.schedule.user?.id,
          this.schedule.title,
          this.schedule.company?.id,
          this.schedule.url,
          this.schedule.note,
          this.schedule.date,
        ]
      );
      c.end();
    });
    return this.schedule;
  }
}
