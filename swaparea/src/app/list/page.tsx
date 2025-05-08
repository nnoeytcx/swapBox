"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser , FaCommentDots} from 'react-icons/fa';

const initialItems = [
  {
    id: 1,
    name: "เสื้อยืดสีขาว size L",
    swapRequest: "แลก: เสื้อยืดสีดำ size M",
    image: "https://happeningandfriends.com/uploads/happening/products/59/005884/เสื้อยึด-ไก่.jpg",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
  {
    id: 2,
    name: "กางเกงวอร์ม",
    swapRequest: "แลก: กางเกงยีนส์",
    image: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/3ce059764171988df3bc62af318fa25da33cce63_xxl-1.jpg",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
  {
    id: 3,
    name: "รองเท้าผ้าใบ size 38",
    swapRequest: "แลก: รองเท้าผ้าใบ size 36",
    image: "https://www.jdsports.co.th/cdn/shop/files/jd_MR530SG_b.jpg?crop=region&crop_height=3039&crop_left=1&crop_top=0&crop_width=4284&v=1726220188&width=4288",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
  {
    id: 4,
    name: "ตู้เย็น",
    swapRequest: "แลก: กระเป๋าเป้สีน้ำตาล",
    image: "https://www.dohome.co.th/media/catalog/product/1/0/10322410_mc_1200_1.jpg",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
];

const ListPage: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

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
          <a href="#" onClick={handleChat} style={styles.navLink}><FaShoppingCart /></a>
          <a href="#" onClick={handleProfile} style={styles.navLink}><FaUser /></a>
        </nav>
      </header>
      <h2 style={styles.title}>My List</h2>
      <main style={styles.swapArea}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
             <img src={item.image} alt={item.name} style={styles.itemImage} />
             <div style={styles.itemInfo}>
               <p style={styles.itemName}>{item.name}</p>
               <p style={styles.itemSwap}>{item.swapRequest}</p>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '18rem', marginTop: '0.5rem' }}>
                      <span
                        style={{ ...styles.icon, cursor: 'pointer' }}
                        onClick={() => handleToggleDetails(item.id)}
                      >
                        เพิ่มเติม
                      </span>
                      <FaCommentDots onClick={handleChat} size={20} />
             </div>
             {showDetails[item.id] && (
              <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                <p>{item.description}</p>
              </div>
            )}
          </div>
           
        ))}
      </main>
    </div>
  );
}

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
