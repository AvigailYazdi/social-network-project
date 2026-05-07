import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useRegisterMutation } from "../hooks/useRegisterMutation";

export const AuthDialog = () => {
  const { isAuthDialogOpen, authMode, closeAuthDialog } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const {
    mutate: login,
    error: loginError,
    reset: loginReset,
    isPending: isLoginPending,
  } = useLoginMutation();

  const {
    mutate: register,
    error: registerError,
    reset: registerReset,
    isPending: isRegisterPending,
  } = useRegisterMutation();

  const isLoginMode = authMode === "login";
  const error = isLoginMode ? loginError : registerError;
  const isPending = isLoginMode ? isLoginPending : isRegisterPending;

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUserName("");
    loginReset();
    registerReset();
  };

  const handleClose = () => {
    resetFields();
    closeAuthDialog();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoginMode) {
      login(
        { email, password },
        {
          onSuccess: () => {
            resetFields();
            closeAuthDialog();
          },
        },
      );
    } else {
      register(
        { name: userName, email, password },
        {
          onSuccess: () => {
            resetFields();
            closeAuthDialog();
          },
        },
      );
    }
  };

  if (!authMode) return null;

  return (
    <Dialog
      className="dialog-auth"
      maxWidth="xs"
      fullWidth
      open={isAuthDialogOpen}
      onClose={handleClose}
    >
      <DialogTitle>{isLoginMode ? "Login" : "Sign Up"}</DialogTitle>

      <DialogContent className="dialog-content">
        <form onSubmit={handleSubmit} id="auth-form">
          {!isLoginMode && (
            <TextField
              required
              label="User name"
              type="text"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          )}

          <TextField
            required
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            required
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>

        {error && <Alert severity="error">{error.message}</Alert>}
      </DialogContent>

      <DialogActions className="dialog-actions">
        <Button
          type="submit"
          form="auth-form"
          disabled={isPending}
          variant="contained"
        >
          {isPending
            ? isLoginMode
              ? "Logging in..."
              : "Signing up..."
            : isLoginMode
              ? "Login"
              : "Sign Up"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
