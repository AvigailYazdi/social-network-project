import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button } from "@mui/material";

export const MyProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="my-profile-page">
      <div className="profile-card">
        <Avatar src={user?.avatarUrl} className="profile-avatar">
          {user?.name?.[0]}
        </Avatar>

        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p className="profile-email">{user?.email}</p>
          <p className="profile-bio">{user?.bio || "No bio yet."}</p>

          <Button variant="contained">Edit Profile</Button>
        </div>
      </div>
    </section>
  );
};
