'use client'; 
import React,{ useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const router = useRouter();
  const handleStartswap = () => {
    router.push('/swap');
  };
  const handleSwaparea = () => {
    router.push('/area');
  };
  const handleList = () => {
    router.push('/list');
  };
  const handleProfile = () => {
    router.push('/profile');
  };
  const handleHome = () => {
    router.push('/home');
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
      <main style={styles.main}>
        <h2 style={styles.title}>Swap Box Swap Area</h2>
        <p style={styles.description}>
          เว็บแอปสำหรับการแลกเปลี่ยนสิ่งของ โดยไม่ต้องใช้เงิน!<br/>
          คนที่มีของเหลือใช้สามารถโพสต์สิ่งของที่ตัวเองต้องการแลก และค้นหาของที่ตัวเองอยากได้จากคนอื่น 
          แล้วจับคู่แลกกันได้แบบง่ายๆ
        </p>
        <div style={styles.buttonContainer}>
          <button onClick={handleStartswap} style={styles.button}>Start Swap</button>
          <button onClick={handleSwaparea} style={styles.button}>Swap Area</button>
        </div>
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
    height: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: '1rem 0',
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
  main: {
    textAlign: 'left',  
    width: '60%',
    marginLeft: 'auto',  
    marginRight: 'auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0',
    paddingLeft: '0',
    marginTop: '120px',
    textShadow: '0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ffcc00',  // เปลี่ยนเป็นสีเหลือง
    background: 'linear-gradient(90deg, #ff69b4, #ffb6c1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.5',
    marginTop: '1rem',
    color:"e8bcb9" 
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  button: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#C1649A',
    color: '#1a1a2e',
    cursor: 'pointer',
    transition: 'all 0.3s ease', 
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
    padding: '0.5rem 0.5rem 0.5rem 2rem', // padding-left เผื่อ icon
    width: '120px',
  },
  
};

export default HomePage;
