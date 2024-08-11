import ApiCall from "@ChatApp/lib/ApiCall";
import { useEffect, useState } from "react";

const useGetChatRoom = () => {
  const [userlist, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const response = await ApiCall("chat/list", "GET");
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

export default useGetChatRoom;
