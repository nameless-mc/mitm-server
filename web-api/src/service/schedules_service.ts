import connection from '../db';
import {User} from './users_service';

const getCompanyNameById=async (id:BigInt)=>{
  const companyDatas=await connection().then((c)=>{
    const datas = c.query('SELECT name FROM companies where id='+id);
    c.end();
    return datas;
  });
  if (!companyDatas || companyDatas.length == 0||!companyDatas[0].name) {
    return null;
  }
  return companyDatas[0].name;
};

export const getSchedules=async (user:User)=>{
  const scheduleDatas=await connection().then((c)=>{
    const datas=c.query(
        'SELECT id,title,company_id,url,note,start,end' +
            'FROM schedules WHERE user_id=?'
        , [user.id],
    );
    c.end();
    return datas;
  });
  const schedules:object[]=[];
  for (const data of scheduleDatas) {
    const companyName:string=await getCompanyNameById(data.company_id);
    if (!companyName) {
      continue;
    }
    const schedule:object={company_name: companyName};
    Object.assign(schedule, data);
    schedules.push(schedule);
  }
  return schedules;
};
