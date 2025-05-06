"use client";

import React, { useState } from "react";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar สำหรับรายชื่อผู้ใช้ */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Swap Chat</h2>
        <ul style={styles.chatList}>
          <li style={styles.chatItem}>Jisoo</li>
          <li style={styles.chatItem}>Lisa</li>
          <li style={styles.chatItem}>Rose</li>
        </ul>
      </aside>

      {/* หน้าต่างแชท */}
      <main style={styles.chatWindow}>
        <h2 style={styles.chatTitle}>Chat with Lisa</h2>
        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <p key={index} style={styles.message}>{msg}</p>
          ))}
        </div>

        {/* ช่องกรอกข้อความ */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1a1a2e",
    color: "#ffffff",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#3f0e40",
    padding: "1rem",
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  chatList: {
    listStyle: "none",
    padding: 0,
  },
  chatItem: {
    padding: "0.75rem",
    cursor: "pointer",
    borderBottom: "1px solid #555",
  },
  chatWindow: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  chatTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "1rem",
  },
  message: {
    backgroundColor: "#3a0ca3",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "0.5rem",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "5px",
    border: "none",
  },
  sendButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#f7b267",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatPage;
