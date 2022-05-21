import { Connection } from 'promise-mysql';
import connection, { idgen } from './db';

export interface User {
  id: Number;
  name: string;
  signinId: string;
  pass: string;
}

export default class UserFixture {
  private user: User = {
    id: idgen(),
    name: 'name',
    signinId: 'signin_id',
    pass: 'pass0001',
  };

  public id(id: number): UserFixture {
    this.user.id = id;
    return this;
  }

  public name(name: string): UserFixture {
    this.user.name = name;
    return this;
  }

  public signinId(signinId: string): UserFixture {
    this.user.signinId = signinId;
    return this;
  }

  public pass(pass: string): UserFixture {
    this.user.pass = pass;
    return this;
  }

  public async build(): Promise<User> {
    await connection().then((c: Connection) => {
      c.query(
        'insert into users(id, name, signin_id, pass) values(?, ?, ?, ?)',
        [this.user.id, this.user.name, this.user.signinId, this.user.pass]
      );
      c.end();
    });
    return this.user;
  }

  public static async build(user: User): Promise<User> {
    const fixture = new UserFixture();
    fixture.user = user;
    return await fixture.build();
  }
}
