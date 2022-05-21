import connection from "../db"

const getCompanyNameById=async (id:BigInt)=>{
    const companyDatas=await connection().then((c)=>{
        const datas = c.query("SELECT name FROM companies where id="+id);
        c.end();
        return datas;
    });
    if (!companyDatas || companyDatas.length == 0||!companyDatas[0].name) {
        return null;
    }
    return companyDatas[0].name;
}

export const getSchedules=async ()=>{
    const scheduleDatas=await connection().then((c)=>{
        const datas=c.query("SELECT id,title,company_id,url,note,date FROM schedules");
        c.end();
        return datas;
    });
    const schedules:object[]=[];
    for(const data of scheduleDatas){
        const company_name:string=await getCompanyNameById(data.company_id);
        if(!company_name){
            continue;
        }
        const schedule:object={company_name:company_name};
        Object.assign(schedule,data);
        schedules.push(schedule);
    }
    return schedules;
}