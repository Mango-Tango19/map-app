import { useState } from "react";
import Service from "./service";

const service = new Service();

export default function useUserInfo() {
  const getUserInfo = (id) => {
    debugger;
    return service.getUSerInfo(id);
  };

  const [userInfo, setUserInfo] = useState(null);

  const saveUserInfo = (id) => {
    let res = getUserInfo(id);
    setUserInfo(res);
  };

  return {
    setUserInfo: saveUserInfo,
    userInfo,
  };
}
