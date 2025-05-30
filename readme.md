# 💬 Chat App Backend

This is the **backend** for a real-time chat application. It provides core functionalities like user authentication, message handling, and connections between users. Built with scalability and security in mind, this server is the backbone of a full-featured chatting platform.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register a new account
  - Login securely with hashed passwords and tokens
- 👥 **User Management**
  - View and search other users
  - Add and manage contacts/friends
- 💬 **Messaging System**
  - Send and receive messages in real time
  - Chat history storage and retrieval
- 📡 **WebSocket Support**
  - Instant communication using Socket.IO or similar
- 🛡️ **Security**
  - JWT authentication
  - Input validation and sanitization
  - CORS support

---

## 🛠️ Tech Stack

- **Node.js** / **Express.js**
- **MongoDB** with Mongoose
- **Socket.IO** for real-time messaging
- **JWT** for authentication
- **bcrypt** for password hashing

---

## 📁 Project Structure

```
/chat-backend
│
├── controllers/     # Route logic (auth, messages, users)
├── db/              # database code (connections, etc.)
├── models/          # MongoDB schemas (User, Message, etc.)
├── routes/          # API route definitions
├── sockets/         # Socket.IO event handlers
├── middleware/      # Auth middleware and validation
├── .env             # Environment variables
├── server.js        # Entry point
└── package.json     # Dependencies and scripts
```

---

## ⚙️ Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/ETKHAN/chatapp.git
   cd chatapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```
   PORT=5000
   MONGODB_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints (Sample)

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive token
- `GET /api/users` – List/search users (auth required)
- `POST /api/messages/send` – Send message
- `GET /api/messages/:userId` – Get chat history

---

## 🧪 Testing

- Use Postman or Insomnia to test APIs
- Unit and integration tests planned for future release

---

## 📌 Future Plans

- Group chats
- Message notifications
- Online/offline status tracking
- Typing indicators
- Media (image/audio) support

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

MIT License
