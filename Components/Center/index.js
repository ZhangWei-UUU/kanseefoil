
import dynamic from "next/dynamic";

const MultiComponents = {
  mychannel:dynamic(import("./Mychannel")),
  message:dynamic(import("./Message")),
  settings:dynamic(import("./Settings")),
};

export default MultiComponents;