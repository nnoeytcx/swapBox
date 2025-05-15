"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser, FaCommentDots } from 'react-icons/fa';

const ListPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

  const router = useRouter();

  const fetchInterestedItems = async () => {
    try {
      const token = localStorage.getItem('jwt_access');
      const res = await fetch("http://127.0.0.1:8000/api/interests/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch interests");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching interested items:", error);
    }
  };

  useEffect(() => {
    fetchInterestedItems();
  }, []);

  const handleHome = () => router.push('/home');
  const handleProfile = () => router.push('/profile');
  const handleChatpage = () => {
    router.push('/chat');
  };

  const handleToggleDetails = (id: number) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Start chat API call
  
  const startChat = async (user2: number, itemId: number) => {
  const token = localStorage.getItem("jwt_access");

  console.log("Attempting to start chat with:", { user2, itemId });

  const res = await fetch("http://127.0.0.1:8000/api/chat/start/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user2: user2,
      item: itemId,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // Show backend error
    console.error("Failed to start chat:", errorText);
    throw new Error("Failed to start chat");
  }

  const data = await res.json();
  console.log("Chat created:", data);
  return data;
};


  // ✅ Triggered when chat icon is clicked
  const handleChat = (user2Id: number, itemId: number) => {
    startChat(user2Id, itemId);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Swap Box</h1>
        <nav style={styles.nav}>
          <a href="#" onClick={handleHome} style={styles.navLink}><FaHome /></a>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              style={styles.searchInput}
            />
          </div>
          <a href="#" onClick={() => router.push('/chat')} style={styles.navLink}><FaShoppingCart /></a>
          <a href="#" onClick={handleProfile} style={styles.navLink}><FaUser /></a>
          <a href="#" onClick={handleChatpage} style={styles.navLink}>chat</a>
        </nav>
      </header>

      <h2 style={styles.title}>My List</h2>
      <main style={styles.swapArea}>
        {items.map((interest) => (
          <div key={interest.id} style={styles.card}>
            <img src={interest.item.image} alt={interest.item.title} style={styles.itemImage} />
            <div style={styles.itemInfo}>
              <p style={styles.itemName}>{interest.item.title}</p>
              <p style={styles.itemSwap}>{interest.item.swap}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18rem', marginTop: '0.5rem' }}>
              <span
                style={{ ...styles.icon, cursor: 'pointer' }}
                onClick={() => handleToggleDetails(interest.id)}
              >
                เพิ่มเติม
              </span>
              <FaCommentDots
                onClick={() => {
                  const ownerId = interest.item.user?.id; // Use `user.id` instead of `owner`
                  const itemId = interest.item.id;

                  console.log("Chat Icon Clicked:", { owner: ownerId, itemId });

                  if (ownerId && itemId) {
                    startChat(ownerId, itemId)
                      .then(() => router.push('/chat'))
                      .catch((err) => console.error(err));
                  } else {
                    console.warn("Invalid item owner or item id", interest);
                  }
                }}
                size={20}
                style={{ cursor: "pointer" }}
              />

            </div>
            {showDetails[interest.id] && (
              <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                <p>{interest.item.description}</p>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    paddingBottom: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: '1rem 0',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff69b4, #ffb6c1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: '#fff',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f7b267',
    marginBottom: '1.5rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '12px',
    padding: '1rem',
    width: '100rem',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  navItem: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },
  image: {
    width: '60px',
    height: '60px',
    backgroundColor: '#ccc',
    borderRadius: '8px',
  },
  itemInfo: {
          textAlign: 'center',
          marginBottom: '1rem',
        },
        
  itemSwap: {
    color: '#555',
    fontSize: '0.9rem',
  },
  swapArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  itemCard: {
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderRadius: "12px",
    color: "#000000",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
  itemImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
        
  itemName: {
    fontWeight: "bold",
    fontSize: "1rem",
    margin: "0.5rem 0",
  },
  swapRequest: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "0.8rem",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  addButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  icon: {
    fontSize: "1rem",
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '0rem 0.5rem',
    color: '#1a1a2e',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    fontSize: '1rem',
    color: '#999999',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '0.8rem',
    backgroundColor: 'transparent',
    color: '#1a1a2e',
    padding: '0.5rem 0.5rem 0.5rem 2rem',
    width: '120px',
  },
};


export default ListPage;
