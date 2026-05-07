import { createContext, useEffect, useState } from "react";
import { getMe, logoutUser } from "../api/usersApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  const isLoggedIn = !!user;

  const loadUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  };

  const openAuthDialog = (mode) => {
    setAuthMode(mode);
    setIsAuthDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        isAuthDialogOpen,
        authMode,
        openAuthDialog,
        closeAuthDialog,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
