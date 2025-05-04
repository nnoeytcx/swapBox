"use client";

import React from "react";

const items = [
  {
    id: 1,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "Swap: เสื้อยืดสีดำ size M",
    image: "https://via.placeholder.com/100",
    likes: 19,
    comments: 3,
  },
  {
    id: 2,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "Swap: เสื้อยืดสีดำ size M",
    image: "https://via.placeholder.com/100",
    likes: 19,
    comments: 3,
  },
  {
    id: 3,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "Swap: เสื้อยืดสีดำ size M",
    image: "https://via.placeholder.com/100",
    likes: 19,
    comments: 3,
  },
  {
    id: 4,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "Swap: เสื้อยืดสีดำ size M",
    image: "https://via.placeholder.com/100",
    likes: 19,
    comments: 3,
  },
  {
    id: 5,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "Swap: เสื้อยืดสีดำ size M",
    image: "https://via.placeholder.com/100",
    likes: 19,
    comments: 3,
  },
  {
    id: 6,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "Swap: เสื้อยืดสีดำ size M",
    image: "https://via.placeholder.com/100",
    likes: 19,
    comments: 3,
  },
];

const AreaPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Swap Box</h1>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>Search</a>
          <a href="#" style={styles.navLink}>Messages</a>
          <a href="#" style={styles.navLink}>Profile</a>
        </nav>
      </header>

      <main style={styles.swapArea}>
        {items.map((item) => (
          <div key={item.id} style={styles.itemCard}>
            <img src={item.image} alt={item.name} style={styles.itemImage} />
            <p style={styles.itemName}>{item.name}</p>
            <p style={styles.swapRequest}>{item.swapRequest}</p>
            <div style={styles.actions}>
              <button style={styles.addButton}>+</button>
              <span style={styles.icon}>❤️ {item.likes}</span>
              <span style={styles.icon}>💬 {item.comments}</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a2e",
    color: "#ffffff",
    padding: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    paddingBottom: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1rem",
  },
  swapArea: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    width: "80%",
  },
  itemCard: {
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderRadius: "8px",
    color: "#000000",
    textAlign: "center",
  },
  itemImage: {
    width: "100px",
    borderRadius: "5px",
  },
  itemName: {
    fontWeight: "bold",
  },
  swapRequest: {
    fontSize: "0.9rem",
    color: "#333",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.5rem",
  },
  addButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  icon: {
    fontSize: "0.9rem",
  },
};

export default AreaPage;
