
# MicroBlogPlatform 📝

A microservices-based blogging platform where users can create posts and comments, with automatic content moderation — built using an event-driven architecture and now fully Dockerized!

---

## 🧩 Overview

This is a full-stack web application that demonstrates microservices design patterns in action. Key features include:

- 📝 Post Creation
- 💬 Commenting System
- 🚫 Content Moderation
- ⚡ Event-Driven Communication via Custom Event Bus
- 📊 Query Aggregation for Optimized Frontend Rendering

Each service is self-contained and runs independently via Docker containers, communicating through a centralized event bus.

---

## 🏗️ Project Structure

```
WebApp/
├── client/         # Frontend React application
├── posts/          # Post creation & management service
├── comments/       # Handles comments on posts
├── moderation/     # Filters inappropriate comments
├── query/          # Aggregates post and comment data
├── event-bus/      # Routes events between microservices
├── docker-compose.yml
```

---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Architecture:** Microservices
- **Communication:** Custom Event Bus
- **Containerization:** Docker, Docker Compose

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure the following are installed on your system:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/) (usually bundled with Docker Desktop)

---

### 📦 Installation & Running with Docker

1. **Clone the repository:**

```bash
git clone https://github.com/DulinaS/WebApp.git
cd WebApp
```

2. **Start all services using Docker Compose:**

```bash
docker-compose up --build
```

This will build and start the following containers:

- `client` (React frontend)
- `posts` (Post service)
- `comments` (Comment service)
- `moderation` (Content moderation service)
- `query` (Query service)
- `event-bus` (Central event handler)

3. **Access the frontend:**

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Example Usage

- Create a new post using the frontend UI.
- Add comments to the post.
- If a comment contains inappropriate words (e.g., "orange"), it is flagged and replaced by the moderation service.
- The query service updates the UI with real-time, aggregated data.

---

## 💻 Development (Without Docker)

If you prefer to run the project locally without Docker:

1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
2. Run each service manually in separate terminals:

```bash
# In each directory:
npm install
npm start
```

---

## 👨‍💻 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repo
2. Create a feature branch: `git checkout -b your-feature-name`
3. Make your changes
4. Push the branch: `git push origin your-feature-name`
5. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- Inspired by **event-driven microservice patterns**
- Based on real-world scalable architecture examples
- Built for learning, experimentation, and portfolio enhancement

---

🚀 **Happy Building!**
