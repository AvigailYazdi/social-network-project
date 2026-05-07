import { useQuery } from "@tanstack/react-query";
import { getAllPublicUsers } from "../api/usersApi";

export const useGetAllPublicUsers = () => {
  return useQuery({
    queryKey: ["publicUsers"],
    queryFn: getAllPublicUsers,
  });
};
