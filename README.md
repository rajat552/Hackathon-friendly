# 🧠 ThinkAI — AI Productivity Copilot

> **"Build hacks that can think and take decisions even better than humans!"**

**ThinkAI** is an intelligent, AI-powered productivity copilot that **thinks**, **reasons**, and **automates** multi-step workflows using Google Gemini. Upload documents, give voice commands, and let ThinkAI handle the rest — from summarization to task generation to email drafting.

Built for **[AI Hackfest 2026](https://ai-hackfest.devpost.com)** · Hosted by **MLH** (Major League Hacking) · April 17–19, 2026

---

## 🎥 Demo Video

> ⏳ 2-minute demo video — coming soon!

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Agentic AI Chat** | Multi-turn conversational AI that reasons across steps — identifies intents, plans workflows, and executes them autonomously |
| 📄 **Document Intelligence** | Upload PDFs/text files — ThinkAI summarizes content, extracts architecture insights, and generates actionable tasks |
| ✅ **Smart Task Pipeline** | AI-generated tasks are synced to MongoDB and displayed in a visual pipeline with real-time status tracking |
| 🎙️ **Voice Commands** | Built-in speech recognition for hands-free interaction with the AI copilot |
| 📧 **Email Drafting** | Automatically drafts professional emails based on document context or chat instructions |
| 📅 **Schedule Planning** | Generates optimized schedules and plans based on natural language input |
| 🔄 **Live Activity Feed** | Real-time visualization of ThinkAI's reasoning pipeline — watch the agent think step-by-step |
| 🌗 **Dark / Light Mode** | Beautiful, responsive UI with smooth theme transitions |

---

## 🏗️ Architecture

```
ThinkAI/
├── frontend/          # React 19 + Vite + TailwindCSS v4
│   ├── src/
│   │   ├── components/    # Navbar, ChatWindow, TaskPanel, ActivityFeed, etc.
│   │   ├── pages/         # Home, Dashboard, DocumentUpload, TaskManager
│   │   ├── hooks/         # useChat, useVoiceInput
│   │   ├── services/      # API client (axios)
│   │   └── context/       # Theme context (dark/light mode)
│   └── index.html
│
├── backend/           # Node.js + Express + MongoDB
│   ├── server.js          # Express app entry point
│   └── src/
│       ├── controllers/   # Chat, upload, task CRUD handlers
│       ├── services/      # GeminiService, WorkflowService (agentic engine)
│       ├── models/        # Mongoose schemas (Task, Conversation)
│       ├── routes/        # API route definitions
│       ├── middleware/     # Auth (JWT + dev bypass), error handler
│       └── utils/         # Response handler utilities
│
└── README.md
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| **AI Model** | Google Gemini 2.5 Flash (via `@google/generative-ai`) |
| **Frontend** | React 19, Vite 7, TailwindCSS 4, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express 5, Mongoose 9 |
| **Database** | MongoDB Atlas |
| **Voice** | Web Speech API (browser-native) |
| **File Parsing** | `pdf-parse` for PDF document extraction |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **MongoDB** instance (Atlas or local)
- A **Google Gemini API key** ([Get one here](https://aistudio.google.com/apikey))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/Hackathon-friendly.git
cd Hackathon-friendly

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/thinkai?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api/ai
```

### Run the Application

```bash
# Terminal 1 — Start Backend
cd backend
npm run dev

# Terminal 2 — Start Frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🧪 How It Works — The Agentic Workflow Engine

ThinkAI is not a simple chatbot. It uses an **agentic workflow architecture** powered by Gemini:

```
User Input → Intent Detection → Workflow Planning → Multi-Step Execution → Result Aggregation
```

1. **Intent Detection**: Gemini analyzes the user's natural language command and identifies intents (`summarize_document`, `generate_tasks`, `draft_email`, `plan_schedule`, `general_chat`)
2. **Workflow Planning**: A multi-step execution plan is generated based on detected intents
3. **Step Execution**: Each step is executed sequentially — document summarization, task extraction, email drafting, etc.
4. **Task Persistence**: Generated tasks are automatically saved to MongoDB
5. **Live Feedback**: Every step is logged in real-time and displayed in the Activity Feed

---

## 📸 Key Pages

- **Home** — Landing page showcasing ThinkAI's capabilities and tech stack
- **Copilot Dashboard** — The main workspace with AI chat, task pipeline, and live activity feed
- **Document Intelligence** — Upload and analyze PDF/text documents with AI
- **Task Manager** — Full CRUD task management with grid/list views, filters, and AI-generated tasks

---

## 🤝 Team

Built with ❤️ for **AI Hackfest 2026**

---

## 📜 License

MIT License — open source and free to use.

---

## 🏆 Hackathon Info

- **Hackathon**: [AI Hackfest 2026](https://ai-hackfest.devpost.com)
- **Hosted by**: MLH (Major League Hacking)  
- **Dates**: April 17–19, 2026
- **Theme**: Build hacks that can think and take decisions even better than humans
- **Tags**: Beginner Friendly · Machine Learning/AI · Open Ended