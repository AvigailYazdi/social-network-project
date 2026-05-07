const API_URL = "http://localhost:3000/api/users";

export const getMe = async () => {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to get user");
  }
  return data;
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to logout");
  }
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Login failed");
  }
  return data;
};

export const getAllPublicUsers = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to fetch users");
  }
  return data;
};
