"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaHome, FaPaperclip, FaImage, FaShoppingCart } from 'react-icons/fa';

interface Message {
  id: number;
  text?: string;
  file?: string;
  sender: { id: number; username: string };
  content: string;
  created_at: string;
}

interface Chat {
  id: number;
  user1: { id: number; username: string };
  user2: { id: number; username: string };
  item:  { id: number; title: string };
  created_at: string;
}

const ChatPage: React.FC = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);


  useEffect(() => {
  const token = localStorage.getItem('jwt_access');
  if (!token) {
    // No token, user not logged in
    return;
  }

  const fetchUser = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch user info');
      const userData = await res.json();
      localStorage.setItem('user_id', userData.id.toString());
      setCurrentUserId(userData.id);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUser();
}, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt_access');
    const userId = localStorage.getItem('user_id');
    console.log("Loaded user ID from localStorage:", userId);

    if (userId) {
      setCurrentUserId(Number(userId));
    }

    const fetchChats = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/chat/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setChatList(data);
    };

    fetchChats();
  }, []);

  const handleChatSelect = async (chatId: number) => {
    setSelectedChatId(chatId);
    const token = localStorage.getItem('jwt_access');
    const res = await fetch(`http://127.0.0.1:8000/api/chat/${chatId}/messages/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data);

    const chat = chatList.find(c => c.id === chatId);
    if (chat && currentUserId !== null) {
      const recipient = chat?.user1?.id === currentUserId ? chat?.user2?.username : chat?.user1?.username;
      const itemName = typeof chat.item === "object" ? chat.item.title : "Unknown Item";
      setSelectedChat(`${recipient} (${itemName})`);
    }
  };

  const handleSendMessage = async () => {
  if (!selectedChatId || input.trim() === "" || currentUserId === null) return;

  const token = localStorage.getItem('jwt_access');
  const res = await fetch(`http://127.0.0.1:8000/api/chat/${selectedChatId}/message/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: input.trim(),
    }),
  });

  const newMsg = await res.json();

  // Ensure sender ID is present for alignment logic
  const msgWithSender = {
    ...newMsg,
    sender: { ...newMsg.sender, id: currentUserId },
  };

  setMessages((prev) => [...prev, msgWithSender]);
  setInput("");
};


  const router = useRouter();
  const handleHome = () => router.push('/home');
  const handleList = () => router.push('/list');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Swap Chat</h2>
        <nav style={styles.nav}>
          <a href="#" onClick={handleList} style={styles.navLink}><FaShoppingCart /></a>
          <a href="#" onClick={handleHome} style={styles.navLink}><FaHome /></a>
        </nav>
        <ul style={styles.chatList}>
          {currentUserId !== null && chatList.map((chat) => {
  const isCurrentUserUser1 = chat.user1?.id === currentUserId;
  const username = isCurrentUserUser1 ? chat.user2?.username : chat.user1?.username;
  const itemName = typeof chat.item === "object" ? chat.item.title : "Unknown Item";

  return (
    <li
      key={chat.id}
      onClick={() => handleChatSelect(chat.id)}
      style={{
        ...styles.chatItem,
        backgroundColor: selectedChatId === chat.id ? "#5d1a6c" : "transparent",
      }}
    >
      {username ?? "Unknown"} ({itemName})
    </li>
  );
})}

        </ul>
      </aside>

      {/* Chat Window */}
      {selectedChatId !== null ? (
        <main style={styles.chatWindow}>
          <h2 style={styles.chatTitle}>Chat with {selectedChat}</h2>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender?.id === currentUserId ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender?.id === currentUserId ? "#4cc9f0" : "#3a0ca3",
                  
                }}
              >
                <p>{msg.content}</p>
                {msg.file && (
                  <img
                    src={msg.file}
                    alt="sent file"
                    style={styles.previewImage}
                  />
                )}
              </div>
            ))}

            {filePreview && (
              <img src={filePreview} alt="Preview" style={styles.previewImage} />
            )}
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.iconButton}>
              <FaImage />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>

            <label style={styles.iconButton}>
              <FaPaperclip />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>

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
      ) : (
        <main style={styles.emptyChatWindow}>
          <h2 style={styles.emptyText}>📭 Select a chat to start messaging</h2>
        </main>
      )}
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
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff69b4, #ffb6c1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: '#fff'
  },
  nav: {
    position: "absolute", // ตำแหน่งรวม
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "2rem", // ห่างกัน
  },
  
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1.5rem", // ขนาดใหญ่ขึ้นถ้าอยาก
    transition: "all 0.3s ease",
    display: "flex", // ให้ icon จัดกลางในลิงก์
    alignItems: "center",
    justifyContent: "center",
  },
  
  sidebar: {
    width: "250px",
    backgroundColor: "#3f0e40",
    padding: "1rem",
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
  emptyChatWindow: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  emptyText: {
    fontSize: "1.5rem",
    color: "#888",
  },
  chatTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  message: {
    padding: "0.75rem",
    borderRadius: "8px",
    maxWidth: "70%",
    wordBreak: "break-word",
  },
  previewImage: {
    maxWidth: "200px",
    borderRadius: "8px",
    marginTop: "0.5rem",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
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
  iconButton: {
    cursor: "pointer",
    fontSize: "1.5rem",
  },
};

export default ChatPage;
