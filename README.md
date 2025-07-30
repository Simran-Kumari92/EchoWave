<h1 align="center">🌍 Echowave — Language Exchange Platform</h1>

Echowave is a complete real-time **language exchange platform** where users can interact via video calls, chat messages, and share media — all **for free**.

With advanced features like **screen sharing, reactions, recording**, and **threaded messaging**, Echowave aims to connect people globally to learn languages in an immersive, user-friendly environment.

---

## 🚀 Tech Stack

- **Frontend**: React, TailwindCSS, Zustand, TanStack Query
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT-based Login & Signup
- **Real-time Services**: Stream API

---

## ✨ Features

- 🔐 **JWT Authentication** with protected routes
- 👤 **User Onboarding Flow**
- 🧑‍🤝‍🧑 **Friends System** with request/accept notifications
- 💬 **Real-Time Chat**
  - Reactions & Emoji Support
  - Typing Indicators
  - Threaded Messages
  - Image Uploads
- 📹 **Video Calling**
  - 1-on-1 and Group Calls
  - Screen Sharing
  - Reactions
  - Call Recording
- 🎨 **32 Unique UI Themes**
- 📦 **Custom Hooks** & Best Practices
- 🧠 Global State Management with Zustand
- 🧪 **API Testing & Error Handling**

---

## 🌐 User Flow

1. **Sign Up** & complete onboarding (cannot skip)
2. **Home Screen** → Add friends
3. **Notifications Page** → Accept requests
4. **Start Chatting** → Use real-time chat, send video call invites
5. **Video Call Page** → Screen share, react, and record sessions

---

## 📁 Project Structure

```bash
ECHOWAVE/
├── backend/                 # Node.js + Express + MongoDB Backend
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/                # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable React Components
│   │   ├── constants/       # Constant values
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── lib/             # API & Utilities
│   │   ├── pages/           # Page Components
│   │   └── store/           # Zustand Global Store
│   ├── .env
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── ...
│
├── .gitignore
├── README.md
└── ...

