import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { loginUser } from "../api/usersApi";
import { AuthContext } from "../context/AuthContext";

export const useLoginMutation = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user);
    },
  });
};