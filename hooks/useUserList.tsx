import ApiCall from "@ChatApp/lib/ApiCall";
import { useEffect, useState } from "react";

const useUserList = () => {
  const [userlist, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const response = await ApiCall("list/user", "GET");
    if (response && response.data) {
      setUserList(response.data);
    } else {
      setUserList([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  return {
    userlist,
    loading,
  };
};

export default useUserList;
