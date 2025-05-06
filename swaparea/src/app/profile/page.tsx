"use client";

import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const user = {
    name: "Jennie Ruby Jen",
    email: "jennierubyjen@gmail.com",
  };

  const [items, setItems] = useState([
    {
      id: 1,
      name: "เสื้อยืดสีขาว size L",
      swapRequest: "เสื้อยืดสีดำ size M",
      image: "https://via.placeholder.com/100",
      likes: 19,
      comments: 3,
    },
    {
      id: 2,
      name: "เสื้อยืดสีขาว size L",
      swapRequest: "เสื้อยืดสีดำ size M",
      image: "https://via.placeholder.com/100",
      likes: 19,
      comments: 3,
    },
    {
      id: 3,
      name: "เสื้อยืดสีขาว size L",
      swapRequest: "เสื้อยืดสีดำ size M",
      image: "https://via.placeholder.com/100",
      likes: 19,
      comments: 3,
    },
    {
      id: 4,
      name: "เสื้อยืดสีขาว size L",
      swapRequest: "เสื้อยืดสีดำ size M",
      image: "https://via.placeholder.com/100",
      likes: 19,
      comments: 3,
    },
  ]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Swap Box</h1>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>Search</a>
          <a href="#" style={styles.navLink}>Chat</a>
          <a href="#" style={styles.navLink}>Profile</a>
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.profile}>
          <h2 style={styles.username}>{user.name}</h2>
          <p style={styles.email}>{user.email}</p>
        </div>

        <h3 style={styles.sectionTitle}>รายการสินค้าที่ต้องการแลกเปลี่ยน</h3>
        <div style={styles.itemList}>
          {items.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <p style={styles.itemName}>{item.name}</p>
                <p style={styles.swapRequest}>ต้องการแลกกับ: {item.swapRequest}</p>
                <div style={styles.actions}>
                  <button style={styles.editButton}>✏️</button>
                  <button style={styles.deleteButton}>🗑️</button>
                  <span style={styles.icon}>❤️ {item.likes}</span>
                  <span style={styles.icon}>💬 {item.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button style={styles.logoutButton}>Log out</button>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    color: '#000000',
  },
  itemImage: {
    width: '100px',
    borderRadius: '5px',
  },
  itemDetails: {
    marginTop: '0.5rem',
  },
  itemName: {
    fontWeight: 'bold',
  },
  swapRequest: {
    fontSize: '0.9rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
  editButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '0.9rem',
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
};

export default ProfilePage;
