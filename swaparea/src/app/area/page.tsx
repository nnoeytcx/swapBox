"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser, FaRegHeart, FaHeart, FaComments } from 'react-icons/fa';

const AreaPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('jwt_access');
        console.log("Token:", token);
        const res = await fetch("http://127.0.0.1:8000/api/items/", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();

        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

  const handleLike = async (itemId: number, liked: boolean) => {
    const token = localStorage.getItem('jwt_access');
    console.log("Token:", token);
    if (!token) return;

    const url = liked
      ? `http://localhost:8000/api/items/${itemId}/unlike/`
      : `http://localhost:8000/api/items/${itemId}/like/`;

    try {
      const res = await fetch(url, {
        method: liked ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId
              ? {
                  ...item,
                  like_count: item.liked ? item.like_count - 1 : item.like_count + 1,
                  liked: !item.liked,
                }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  const router = useRouter();
  const handleHome = () => {
    router.push('/home');
  };
  const handleList = () => {
    router.push('/list');
  };
  const handleProfile = () => {
    router.push('/profile');
  };

  const handleToggleComment = (id: number) => {
    setShowCommentInput(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCommentChange = (id: number, text: string) => {
    setCommentText(prev => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleSubmitComment = async (id: number) => {
    const token = localStorage.getItem('jwt_access');
    const text = commentText[id]?.trim();
    if (!token || !text) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/items/${id}/comments/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: text })
      });

      if (res.ok) {
        const newComment = await res.json(); // Assuming the new comment is returned in the response

        setItems(prevItems =>
          prevItems.map(item =>
            item.id === id
              ? { ...item, comments: [...item.comments, newComment] } // Add the new comment to the array
              : item
          )
        );
        setCommentText(prev => ({ ...prev, [id]: '' }));
        // Keep comment input visible after adding the comment
        setShowCommentInput(prev => ({ ...prev, [id]: true }));
      } else {
        console.error("Failed to submit comment");
      }
    } catch (err) {
      console.error("Error submitting comment", err);
    }
  };

  const handleToggleDetails = (id: number) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <a href="#" onClick={handleList} style={styles.navLink}><FaShoppingCart /></a>
          <a href="#" onClick={handleProfile} style={styles.navLink}><FaUser /></a>
        </nav>
      </header>

      <main style={styles.swapArea}>
        {items.map((item) => (
          <div key={item.id} style={styles.itemCard}>
            <img src={item.image} alt={item.title} style={styles.itemImage} />
            <p style={styles.itemName}>{item.title}</p>
            <p style={styles.swapRequest}>swap for : {item.swap}</p>
            <div style={styles.actions}>
              <button style={styles.addButton}>+</button>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => handleLike(item.id, item.liked)}>
                {item.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                <span style={{ marginLeft: '0.3rem' }}>{item.like_count}</span>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...styles.icon }}
                onClick={() => handleToggleComment(item.id)}>
                <FaComments style={{ marginRight: '5px' }} />
              </span>

              <span
                style={{ ...styles.icon, cursor: 'pointer', color: "#6b6e60" }}
                onClick={() => handleToggleDetails(item.id)}
              >
                เพิ่มเติม
              </span>
            </div>

            {showDetails[item.id] && (
              <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                <p>{item.description}</p>
              </div>
            )}

            {showCommentInput[item.id] && (
              <div style={{
                marginTop: '0.5rem',
                textAlign: 'left',
                background: '#f4f4f4',
                padding: '0.5rem',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column', // Ensures comments are stacked
                gap: '0.3rem', // Adds space between comments
              }}>
                {item.comments.map((comment: any) => (
                  <div key={comment.id} style={{
                    padding: '0.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adds subtle shadow
                  }}>
                    <strong>{comment.user}:</strong> {comment.content}
                  </div>
                ))}
              </div>
            )}

            {showCommentInput[item.id] && (
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="เขียนคอมเมนต์..."
                  value={commentText[item.id] || ''}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    marginBottom: '0.5rem',
                  }}
                />
                <button
                  onClick={() => handleSubmitComment(item.id)}
                  style={{
                    padding: '0.3rem 0.7rem',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#1a1a2e',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  ส่ง
                </button>
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
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
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
  swapArea: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "2rem",
    width: "80%",
    marginTop: "3rem",
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
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.8rem",
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


export default AreaPage;
