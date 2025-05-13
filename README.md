# MicroBlogPlatform

A microservices-based blogging platform that allows users to create posts and comments, with a built-in content moderation system and event-driven architecture.

## 🧩 Overview

This project demonstrates a full-stack web application built using microservices. It features:

- **Post Creation**
- **Commenting on Posts**
- **Content Moderation**
- **Event-driven Communication**
- **Query Aggregation for Optimized Frontend Rendering**

Each service is isolated, runs independently, and communicates via a custom-built event bus.

---

## 🏗️ Project Structure

```
WebApp/
├── client/         # Frontend React application
├── posts/          # Service to create and manage posts
├── comments/       # Service to handle comments on posts
├── moderation/     # Service to filter inappropriate comments
├── query/          # Service to aggregate post and comment data
├── event-bus/      # Service to route events between microservices
```

---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Architecture:** Microservices
- **Communication:** Custom Event Bus
- **Containerization:** Docker (optional)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [Docker](https://www.docker.com/) (optional, for containerization)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DulinaS/WebApp.git
cd WebApp
```

2. Install dependencies for each service:

```bash
cd client && npm install
cd ../posts && npm install
cd ../comments && npm install
cd ../moderation && npm install
cd ../query && npm install
cd ../event-bus && npm install
```

---

### Run All Services Locally

Use separate terminals for each service:

```bash
cd event-bus && npm start
cd posts && npm start
cd comments && npm start
cd moderation && npm start
cd query && npm start
cd client && npm start
```

---

## 🐳 Docker Setup (Optional)

If you prefer running the project in Docker containers, add your own `docker-compose.yml` and Dockerfiles for each service, then run:

```bash
docker-compose up --build
```

---

## 🧪 Example Usage

- Create a post from the client UI.
- Add comments to the post.
- Inappropriate words will be detected and replaced via the moderation service.
- Query service aggregates data and displays it on the client.

---

## 👨‍💻 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Push your branch: `git push origin feature-name`
5. Create a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Inspired by event-driven microservices principles
- Educational microservice design patterns based on real-world use cases
