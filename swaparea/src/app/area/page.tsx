"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser , FaRegHeart,FaHeart, FaComments} from 'react-icons/fa';

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
  {
    id: 5,
    name: "กระเป๋าสีน้ำตาล",
    swapRequest: "แลก: กระเป๋าสะพายข้าง",
    image: "https://today-obs.line-scdn.net/0hvgH4EilqKUh1TThQ1CRWH00bJTlGKzNBVy5mLARFIHwIYWtMSyt6K1IadGQIem8fVShhKVIdInhcKDsYGg/w644",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
  {
    id: 6,
    name: "ผ้าห่ม",
    swapRequest: "แลก: ผ้าปูที่นอน",
    image: "https://darling.co.th/wp-content/uploads/2021/11/DC_Export-3595-scaled.jpg",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
  {
    id: 7,
    name: "เสื้อยืดสีดำ size L",
    swapRequest: "แลก: เสื้อเชิ้ตสีฟ้า size ศ",
    image: "https://c.min.ms/s/storefile/91/itemgallery/c_1682407831.jpg",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
  {
    id: 8,
    name: "กางเกงยีนส์",
    swapRequest: "แลก: กางเกงช้าง",
    image: "https://wrangler.co.th/cdn/shop/files/8859286674731_03_7a38eeb5-510c-447e-a207-5004babafcc7_800x.jpg?v=1718022928",
    description: "หรือแลกกับอะไรก็ได้",
    likes: 0,
    comments: 0,
    commentList: [],
    liked: false,
  },
];

const AreaPage: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

  const handleLike = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              liked: !item.liked,
            }
          : item
      )
    );
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

  const handleSubmitComment = (id: number) => {
    if (commentText[id]?.trim()) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id
            ? {
                ...item,
                comments: item.comments + 1,
              }
            : item
        )
      );
      setCommentText(prev => ({
        ...prev,
        [id]: '',
      }));
      setShowCommentInput(prev => ({
        ...prev,
        [id]: false,
      }));
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
            <img src={item.image} alt={item.name} style={styles.itemImage} />
            <p style={styles.itemName}>{item.name}</p>
            <p style={styles.swapRequest}>{item.swapRequest}</p>
            <div style={styles.actions}>
              <button style={styles.addButton}>+</button>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => handleLike(item.id)}>
                                {item.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                                <span style={{ marginLeft: '0.3rem' }}>{item.likes}</span>
            </div>
            <span
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...styles.icon }}
                                onClick={() => handleToggleComment(item.id)}
                              >
                                <FaComments style={{ marginRight: '5px' }} />
                                {item.comments}
                              </span>
            <span
                style={{ ...styles.icon, cursor: 'pointer' ,color:"#6b6e60"}}
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
