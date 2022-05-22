import connection, { idgen } from '../db';
import {User} from './users_service';
import { badRequestException, notFoundException } from '../error';

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
        'SELECT id,title,company_id,url,note,start,end ' +
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

export const getScheduleById=async (id:number)=>{
  const scheduleDatas=await connection().then((c)=>{
    const datas=c.query(
        'SELECT id,title,company_id,url,note,start,end' +
        'FROM schedules WHERE id=?'
        , [id],
    );
    c.end();
    return datas;
  });
  if(!scheduleDatas||scheduleDatas.length==0){
    throw notFoundException('schedule not found', 'SCHEDULE');
  }
  const companyName:string=await getCompanyNameById(scheduleDatas[0].company_id);
  if (!companyName) {
    throw notFoundException();
  }
  const schedule:object={company_name: companyName};
  Object.assign(schedule, scheduleDatas[0]);
  return schedule;
}

export const createSchedule=async (
  user:User,
  data:{
      title: string,
      companyId: number,
      companyName: string,
      url?:string,
      note?: string,
      start: Date,
      end: Date
  }
)=>{
  const schedule={
    id:idgen(),
    user_id:user.id,
    title:data.title,
    company_id:data.companyId,
    url:data.url,
    note:data.note,
    start:data.start,
    end:data.end,
    updated_at:new Date(),
    created_at:new Date()
  };
  const res=await connection().then((c)=>{
    const data=c.query('INSERT INTO schedules VALUES(?,?,?,?,?,?,?,?,?,?)',
    [
      schedule.id,
      schedule.user_id,
      schedule.title,
      schedule.company_id,
      schedule.url,
      schedule.note,
      schedule.start,
      schedule.end,
      schedule.updated_at,
      schedule.created_at
    ]).catch(()=>{
      return badRequestException();
    });
    c.end();
    return data;
  });
  if(res instanceof Error){
    throw badRequestException();
  }
  return {
    id:schedule.id,
    title:schedule.title,
    company_id:schedule.company_id,
    company_name:data.companyName,
    url:schedule.url,
    note:schedule.note,
    start:schedule.start,
    end:schedule.end
  };

}

export const updateSchedule=async(
  user:User,
  data:{
      id:number,
      title: string,
      companyId: number,
      companyName: string,
      url?:string,
      note?: string,
      start: Date,
      end: Date
  }
)=>{
  const oldData:any=await getScheduleById(data.id);
  const schedule={
    id:data.id,
    user_id:user.id,
    title:data.title||oldData.title,
    company_id:data.companyId||oldData.company_id,
    company_name:data.companyName||oldData.company_name,
    url:data.url||oldData.url,
    note:data.note||oldData.note,
    start:data.start||oldData.start,
    end:data.end||oldData.end,
    updated_at:new Date(),
    created_at:oldData.created_at
  };
  const res = await connection().then((c) => {
    return c
        .query(
            'UPDATE schedules SET ' +
          'id = ?, user_id = ?, title = ?, company_id = ?' +
          ', url = ?, note = ?, start = ?, end = ?' +
          ', updated_at = ?, created_at = ?' +
          ' WHERE id = ?',
            [
              schedule.id,
              schedule.user_id,
              schedule.title,
              schedule.company_id,
              schedule.url,
              schedule.note,
              schedule.start,
              schedule.end,
              schedule.updated_at,
              schedule.created_at
            ]
        )
        .catch(() => {
          return badRequestException();
        });
  });
  if (res instanceof Error) {
    throw badRequestException();
  }
  return schedule;
}

export const deleteSchedule=async(user:User,scheduleId:number)=>{
  const res=await connection().then((c)=>{
    const data=c.query("DELETE FROM schedules WHERE id=?",
    [scheduleId]).catch(()=>{
      return badRequestException();
    });
    c.end();
    return data;
  });
  if(res instanceof Error){
    throw badRequestException();
  }
}