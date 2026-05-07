# Social Network Project

A full-stack social network application built with:

- React + Vite
- Node.js + Express
- MongoDB Atlas
- Docker + Docker Compose

---

## Features

- User authentication
- Public user profiles
- Personal profile page
- Feed page
- Friend requests
- Responsive UI

---

## Tech Stack

### Frontend
- React
- React Router
- TanStack Query

### Backend
- Node.js
- Express
- MongoDB + Mongoose

### DevOps
- Docker
- Docker Compose

---

## Run Locally with Docker

Make sure Docker Desktop is running.

Then run:

```bash
docker compose up --build
```

---

## URLs

Client:

```txt
http://localhost:5173
```

Server:

```txt
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
```

For security reasons, the real `.env` file is not included in the repository.

---

## Project Structure

```txt
client/
server/
docker-compose.yml
```