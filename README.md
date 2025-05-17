
# MicroBlogPlatform 📝

A microservices-based blogging platform where users can create posts and comments, with automatic content moderation — built using an event-driven architecture. Now fully containerized and orchestrated with **Kubernetes** and **Skaffold** for seamless local development!

---

## 🧩 Overview

This full-stack application demonstrates real-world microservice patterns:

- 📝 Post Creation
- 💬 Commenting System
- 🚫 Content Moderation
- ⚡ Event-Driven Communication via a Custom Event Bus
- 📊 Query Aggregation for Optimized Frontend Rendering

---

## 🏗️ Project Structure

```
MicroBlogApp-using-MicroServices/
├── client/             # React frontend
├── posts/              # Post creation & management service
├── comments/           # Handles comments
├── moderation/         # Filters inappropriate comments
├── query/              # Aggregates post and comment data
├── event-bus/          # Routes events between services
├── infra/              # Kubernetes manifests (Deployments, Services, Ingress)
├── skaffold.yaml       # Skaffold configuration (in root)
├── docker-compose.yml
```

---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Architecture:** Microservices
- **Communication:** Custom Event Bus
- **Containerization & Orchestration:** Docker, Kubernetes
- **Dev Workflow:** Skaffold + Ingress-NGINX

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Kubernetes](https://kubernetes.io/docs/tasks/tools/)
- [Skaffold](https://skaffold.dev/docs/install/)
- [Ingress-NGINX Controller](https://kubernetes.github.io/ingress-nginx/)

> **Note:** Map `posts.com` to your local machine by adding this line to your `/etc/hosts`:
>
> ```
> 127.0.0.1 posts.com
> ```

---

### ⚙️ Running with Kubernetes & Skaffold

1. **Clone the repository:**

```bash
git clone https://github.com/DulinaS/MicroBlogApp-using-MicroServices.git
cd MicroBlogApp-using-MicroServices
```

2. **Ensure your Kubernetes cluster is running** (e.g., via Docker Desktop or Minikube)

3. **Install Ingress-NGINX** (if not already installed):

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml
```

4. **Start development using Skaffold:**

```bash
skaffold dev
```

5. **Access the application:**

Visit [http://posts.com](http://posts.com) in your browser.

---

### 🐳 Running with Docker Compose

To run without Kubernetes:

```bash
docker-compose up --build
```

Then go to: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Example Usage

- Create a post
- Add comments
- Comments with banned words (e.g., "orange") are flagged and replaced
- Real-time updates appear via the query service

---

## 🧰 Local Development (No Docker)

1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
2. Run each service manually in separate terminals:

```bash
cd <service>
npm install
npm start
```

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit
4. Push and create a Pull Request

---

## 📄 License

Licensed under the **MIT License**

---

## 🙏 Acknowledgments

- Inspired by modern, event-driven microservice architecture
- Designed for learning, showcasing, and production readiness

---

🚀 **Build. Learn. Scale.**
