# 🤖 Self-Hosted AI Code Review Bot for GitHub PRs

A fully self-hosted AI-powered GitHub bot that automatically reviews pull requests using a local Large Language Model (LLM) via Ollama. It analyzes code changes, detects issues, and posts structured review comments directly on GitHub, without using any external AI APIs.

---

# 🚀 Key Features

- GitHub App + Webhook integration
- Automatic pull request event handling
- GitHub REST API integration for diff fetching and comments
- Intelligent diff parsing and filtering
- Chunking support for large code changes
- Local LLM inference using Ollama (Llama 3 / DeepSeek Coder)
- Structured AI-generated code reviews
- Fully self-hosted (no external AI APIs)

---

# 🏗️ Architecture

GitHub Pull Request
↓
GitHub Webhook (Node.js Server)
↓
PR Diff Extraction (GitHub REST API)
↓
File Filtering & Chunking Layer
↓
Local LLM (Ollama)
↓
AI Review Generator
↓
GitHub PR Comment API

---

# ⚙️ How It Works

1. A pull request event triggers a GitHub webhook  
2. The server receives PR metadata and fetches changed files  
3. Diff is extracted using GitHub REST API  
4. Large diffs are split into chunks for better LLM processing  
5. Each chunk is sent to a local LLM (Ollama)  
6. AI generates structured review feedback  
7. Final review is posted back as a PR comment  

---

# 🧠 Local LLM (Ollama Setup)

Install Ollama:

```
https://ollama.com
```

Run model:

```bash
ollama run llama3
```

or

```bash
ollama run deepseek-coder
```

---

# 💻 CPU vs GPU Inference

## 🧠 CPU Mode
- Runs on normal machines
- No GPU required
- Slower inference speed
- Suitable for small models

## ⚡ GPU Mode
- Uses CUDA acceleration
- Faster response times
- Recommended for large models
- Better for production workloads

---

# ☁️ VPS Deployment

This system can be deployed on low-cost VPS providers:

- DigitalOcean ($5–$10/month)
- AWS EC2
- Railway / Render

### Typical Production Setup:
- Node.js backend server
- Ollama running locally on VPS
- HTTPS reverse proxy (Nginx)
- GitHub webhook exposed endpoint

---

# 🔁 Event Flow

```

GitHub PR Event
→ Webhook Trigger
→ Server Receives Event
→ Fetch Changed Files
→ Chunk Large Diffs
→ Send to Local LLM
→ Generate AI Review
→ Post Comment on PR

```

---


# 🧰 Tech Stack

- Node.js
- Express.js
- GitHub Webhooks
- GitHub REST API
- Ollama (Local LLM)
- JavaScript

---

# 📌 Why This Project Matters

This project demonstrates how AI can be embedded directly into developer workflows using event-driven architecture and local LLMs, ensuring privacy, cost efficiency, and full control over data.

---

# 🔐 Privacy Advantage

Unlike cloud-based AI tools:
- No code is sent to external APIs
- Everything runs locally using Ollama
- Fully self-hosted and secure

---

# 🎯 Real-World Use Case

This system acts like a lightweight version of:

- GitHub Copilot Review
- CI/CD AI code reviewer
- Internal engineering assistant

---

# 🚀 Summary

This project demonstrates:
- Event-driven system design
- GitHub API integration
- Local AI inference
- Real-time automation pipeline
- Production-style architecture design

```
