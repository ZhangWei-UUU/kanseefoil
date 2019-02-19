const moneyFormat = (originValue = 0) => {
  const intValue = parseInt(Math.abs(originValue).toFixed(0), 10);
  const result = intValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return result;
};

export default moneyFormat; 