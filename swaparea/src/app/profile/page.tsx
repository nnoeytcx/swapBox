"use client";

import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser , FaEdit, FaTrash, FaRegHeart,FaHeart, FaComments} from 'react-icons/fa';


const ProfilePage: React.FC = () => {

  
  const user = {
    name: "Jennie Ruby Jen",
    email: "jennierubyjen@gmail.com",
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('jwt_access');
        console.log("Token:", token);
        const res = await fetch("http://127.0.0.1:8000/api/user-items/", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
  const [editName, setEditName] = useState('');
  const [editSwapRequest, setEditSwapRequest] = useState('');
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});
  const [profileImage, setProfileImage] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
  const [newProfileImage, setNewProfileImage] = useState('');

  const router = useRouter();

  const handleHome = () => {
    router.push('/home');
  };
  const handleChat = () => {
    router.push('/chat');
  };
  const handleProfile = () => {
    router.push('/profile');
  };
  const handleLogout = () => {
    router.push('/login');
  };
  const handleList = () => {
    router.push('/list');
  };

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

  const handleDelete = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleEdit = (item: any) => {
    setEditingItemId(item.id);
    setEditName(item.title);
    setEditSwapRequest(item.swap);
  };

  const handleSaveEdit = async (id: number) => {
    const token = localStorage.getItem('jwt_access');
  try {
    const response = await fetch(`http://localhost:8000/api/items/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // your JWT token
      },
      body: JSON.stringify({
        title: editName,
        swap: editSwapRequest,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update item');
    }

    const updatedItem = await response.json();

    // Update state with the updated item
    const updatedItems = items.map(item =>
      item.id === id ? updatedItem : item
    );
    setItems(updatedItems);
    setEditingItemId(null);
  } catch (error) {
    console.error('Error updating item:', error);
  }
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
            <input type="text" placeholder="Search..." style={styles.searchInput} />
          </div>
          <a href="#" onClick={handleList} style={styles.navLink}><FaShoppingCart/></a>
          <a href="#" onClick={handleProfile} style={styles.navLink}><FaUser /></a>
        </nav>
      </header>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}>
      <div style={{ marginBottom: '20px' }}>
        <img
          src={profileImage}
          alt="Profile"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />
      </div>
      <label
        htmlFor="upload"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          background: 'linear-gradient(90deg, #4CAF50 0%, #45A049 100%)',
          color: '#fff',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'linear-gradient(90deg, #45A049 0%, #4CAF50 100%)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'linear-gradient(90deg, #4CAF50 0%, #45A049 100%)')}
      >
        เปลี่ยนรูปโปรไฟล์
      </label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
      <main style={styles.main}>
        <div style={styles.profile}>
          <h2 style={styles.username}>{user.name}</h2>
          <p style={styles.email}>{user.email}</p>
        </div>
        <div style={styles.itemList}>
          {items.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.title} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                {editingItemId === item.id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ width: '100%', marginBottom: '0.5rem' }}
                    />
                    <input
                      value={editSwapRequest}
                      onChange={(e) => setEditSwapRequest(e.target.value)}
                      style={{ width: '100%' }}
                    />
                    <button onClick={() => handleSaveEdit(item.id)} style={styles.saveButton}>Save</button>
                  </>
                ) : (
                  <>
                    <p style={styles.itemName}>{item.title}</p>
                    <p style={styles.swapRequest}>swap for : {item.swap}</p>
                  </>
                )}

                <div style={styles.actions}>
                  <a href="#"  onClick={() => handleEdit(item)} style={styles.editButton}><FaEdit /></a>
                  <a href="#"  onClick={() => handleDelete(item.id)} style={styles.editButton}><FaTrash /></a>
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
                <div>
                  
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>Log out</button>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1.5rem',
  },
  main: {
    textAlign: 'center',
    width: '60%',
  },
  profile: {
    marginBottom: '1rem',
  },
  username: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  email: {
    fontSize: '1rem',
    color: '#ccc',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    padding: '1rem 0',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '12px',
    color: '#000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  itemImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  itemDetails: {
    width: '100%',
    textAlign: 'left',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '0.25rem',
  },
  swapRequest: {
    fontSize: '0.85rem',
    color: '#555',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.75rem',
    width: '100%',
    alignItems: 'center',
  },
  editButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  icon: {
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  logoutButton: {
    marginTop: '2rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#f7b267',
    color: '#1a1a2e',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
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
  saveButton: {
    marginTop: '0.5rem',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
  },
  commentButton: {
    marginTop: '0.3rem',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
    backgroundColor: '#f7b267',
    border: 'none',
    borderRadius: '5px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '0.5rem',
    border: '2px solid #f7b267',
  },
  profileInput: {
    padding: '0.3rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '0.8rem',
    width: '180px',
    marginRight: '0.5rem',
  },
  profileButton: {
    padding: '0.3rem 0.7rem',
    fontSize: '0.8rem',
    backgroundColor: '#f7b267',
    color: '#1a1a2e',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  
};

export default ProfilePage;
