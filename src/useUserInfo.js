import { useState } from "react";
import Service from "./service";

const service = new Service();

export default function useUserInfo() {
  const getUserInfo = (id) => {
    return service.getUSerInfo(id);
  };

  const [userById, setUserById] = useState(null);

  const seveUserById = (id) => {
    let res = getUserInfo(id);
    setUserById(res);
  };

  return {
    setUserById: seveUserById,
    userById,
  };
}
