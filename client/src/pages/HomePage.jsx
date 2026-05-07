import { useGetAllPublicUsers } from "../hooks/useGetAllPublicUsers";

export const HomePage = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useGetAllPublicUsers();

  if (isLoading) return <p>Loading users...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <section className="home-page">
      <div className="home-header">
        <h1>Discover People</h1>
        <p>Explore profiles and connect with people.</p>
      </div>
      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-avatar-wrapper">
              <img
                className="user-avatar"
                src={user.avatarUrl}
                alt={user.name}
              />
            </div>
            <div className="user-card-content">
              <h3>{user.name}</h3>
              <p>{user.bio || "No bio yet"}</p>
              <button>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
