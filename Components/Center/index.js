
import dynamic from "next/dynamic";

const MultiComponents = {
  mychannel:dynamic(import("./Mychannel")),
  customers:dynamic(import("./Customers")),
  goods:dynamic(import("./Goods")),
  customerlist:dynamic(import("./Customerlist")),
  goodslist:dynamic(import("./Goodslist")),
  addCustomer:dynamic(import("./addCustomer")),
  addGoods:dynamic(import("./addGoods")),
  orders:dynamic(import("./Order")),
  settings:dynamic(import("./Settings")),
};

export default MultiComponents;