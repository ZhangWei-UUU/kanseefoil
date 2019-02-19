// 检查数据类型是否为数组
const isArray = (originData) => {
  if(originData.constructor !== Array){
    return {success:false,message:"数据类型必须为数组形式,当前传入数据类型为" + typeof originData};
  }else{
    return {success:true,payload:originData};
  }
};

// 筛选和计算过去前十二个月的数据
const filter_recent = (originData) => {
  console.log(originData);
  let current_month = new Date().getMonth()+1;
  let current_year = new Date().getFullYear();
  let start = new Date("2018-2-01").getTime();
  return {success:true,payload:originData};
};

// 筛选出销售额最高的前三个大客户
const getTopThree = (originData) => {
  const isarray_result = isArray(originData);
  if(isarray_result.success){
    const recent_data = filter_recent(isarray_result.payload);
    return recent_data;
  }else{
    return isarray_result; 
  }
};

export default getTopThree;