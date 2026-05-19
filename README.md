# 🤖 Self-Hosted AI Code Review Bot for GitHub PRs

A fully self-hosted AI-powered GitHub bot that automatically reviews pull requests using a local Large Language Model (LLM) via Ollama. It analyzes code changes, detects issues, and posts structured review comments directly on GitHub, without using any external AI APIs.

## 🚀 Key Features
- GitHub App + Webhook integration
- Automatic pull request event handling
- GitHub REST API integration for diff fetching and comments
- Intelligent diff parsing and filtering
- Chunking support for large code changes
- Local LLM inference using Ollama (Llama 3 / DeepSeek Coder)
- Structured AI-generated code reviews
- Fully self-hosted (no external AI APIs)

## ⚙️ How It Works
1. A pull request event triggers a GitHub webhook
2. The server receives PR metadata and fetches changed files
3. Diff is extracted using GitHub REST API
4. Large diffs are split into chunks for better LLM processing
5. Each chunk is sent to a local LLM (Ollama)
6. AI generates structured review feedback
7. Final review is posted back as a PR comment

## 🧰 Tech Stack
- Node.js
- Express.js
- GitHub Webhooks
- GitHub REST API
- Ollama (Local LLM)
- JavaScript

## 🧠 Local LLM (Ollama Setup)
### Install Ollama
https://ollama.com
### Run model
```bash
ollama run llama3
# or
ollama run deepseek-coder
```

## 🛠️ Full Setup Guide
### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-name>
npm install
```
### 2. Setup environment variables
Create a `.env` file:
```
PORT=3000
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY=your_private_key
WEBHOOK_SECRET=your_webhook_secret
```

### 3. Setup GitHub App
Go to: **GitHub → Settings → Developer settings → GitHub Apps**
Create a new GitHub App with:
**Permissions:**
- Pull requests → Read & write
- Issues → Read & write
- Metadata → Read-only

**Webhook settings:**
- Webhook URL: `https://<your-ngrok-url>/webhook`
- Webhook events: Pull request
### 4. Install GitHub App on repository
After creating the app, click **Install App** and select your repository.
### 5. Run local server
```bash
npm run dev
```
Server runs on: `http://localhost:3000`
### 6. Start ngrok
```bash
ngrok http 3000
```
Copy the HTTPS URL (e.g. `https://xxxx.ngrok-free.app`) and update your GitHub App's webhook URL with it.
### 7. Test the system
```bash
git checkout -b <branch-name>
# Make a small change
git add .
git commit -m "<commit-message>"
git push origin <branch-name>
```
Then open a Pull Request on GitHub: **Compare & Pull Request → Create PR**

## 🔁 Event Flow (Runtime)
```
GitHub PR Event
→ Webhook Trigger (ngrok)
→ Node.js Server
→ Fetch PR Diff via GitHub API
→ Chunk Diff (if large)
→ Send to Ollama (Local LLM)
→ Generate AI Review
→ Post Comment on GitHub PR
```

## 💻 CPU vs GPU Inference
**🧠 CPU Mode**
- Runs on normal laptops
- No GPU required
- Slower inference
- Good for small models

**⚡ GPU Mode**
- Uses CUDA acceleration
- Faster responses
- Recommended for large models

## ☁️ VPS Deployment (Production Option)
Deploy on DigitalOcean ($5–$10/month), AWS EC2, Railway, or Render with:
- Node.js backend
- Ollama runtime installed on server
- Nginx reverse proxy
- HTTPS endpoint for GitHub webhook

## 🔐 Privacy Advantage
- No code is sent to external APIs
- Everything runs locally via Ollama
- Fully self-hosted and secure

## 🎯 Real-World Use Case
This is a lightweight version of:
- GitHub Copilot Code Review
- CI/CD automated reviewer
- Internal AI engineering assistant

## 📌 Why This Project Matters
- Event-driven system design
- GitHub API integration
- Local AI inference pipelines
- Real-time automation workflows
- Production-style system architecture
