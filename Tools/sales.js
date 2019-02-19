import moneyFormat from "./moneyFormat";
let total = 0;
let paid_money = 0;

const sales = (originData) => {
  originData.forEach(obj=>{
    total += obj.sum;
    if(obj.payment){
      paid_money+= obj.sum;
    }
  });
  
  let unpaid_rate = (total-paid_money)/total;
  let paid_rate = paid_money/total;

  let data = [{
    item: "未付款项",
    count: moneyFormat(total-paid_money),
    percent: unpaid_rate
  }, {
    item: "已付清",
    count: moneyFormat(paid_money),
    percent:paid_rate
  }];

  return {total,data};
};

export default sales;