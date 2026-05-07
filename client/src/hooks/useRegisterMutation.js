import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { registerUser } from "../api/usersApi";
import { AuthContext } from "../context/AuthContext";

export const useRegisterMutation = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      login(data.user);
    },
  });
};