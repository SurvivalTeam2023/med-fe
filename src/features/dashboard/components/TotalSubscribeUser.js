// useTotalActiveUsers.js
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTotalSubscribeUser } from "../../../Axios/Apis/user/user";

export function useTotalSubscribeUsers() {
  const [totalSubscribeUser, setTotalSubscribeUsers] = useState(0);

  const fetchTotalSubscribeUser = async () => {
    const res = await getTotalSubscribeUser();
    const data = res.data;
    return data;
  };

  const {
    isLoading: isLoadingSubscribe,
    data: number,
    isError: isErrorSubscribe,
  } = useQuery({
    queryKey: ["subscribe"],
    queryFn: fetchTotalSubscribeUser,
    onSuccess: (data) => {
      setTotalSubscribeUsers(data);
    },
  });

  return { totalSubscribeUser, isLoadingSubscribe, isErrorSubscribe };
}
