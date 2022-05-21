import { exit } from 'process';
import CompanyFixture from './company_fixture';
import { clearDB, idgen } from './db';
import ScheduleFixture from './schedules_fixture';
import UserFixture from './user_fixture';

clearDB().then(async () => {
  const user = await new UserFixture()
    .id(idgen())
    .name('user1')
    .signinId('user1')
    .pass('pass0001')
    .build();

  const company = await new CompanyFixture()
    .user(user)
    .id(idgen())
    .name('company1')
    .industry('SIer')
    .status('in progress')
    .url('http://example.com')
    .build();

  await new ScheduleFixture()
    .id(idgen())
    .company(company)
    .title('schedule1')
    .url('http://example.com')
    .build()
    .then(() => {
      console.log('insert completed');
      exit();
    });
});
