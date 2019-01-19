
import dynamic from "next/dynamic";

const MultiComponents = {
  mychannel:dynamic(import("./Mychannel")),
  customers:dynamic(import("./Customers")),
  orders:dynamic(import("./Order")),
  message:dynamic(import("./Message")),
  settings:dynamic(import("./Settings")),
};

export default MultiComponents;