"use client";
import React, {useState} from 'react';
import { FaHome, FaSearch, FaComments, FaUser } from 'react-icons/fa';

const SwapPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Swap Box</h1>
        <nav style={styles.nav}>
                <a href="#" style={styles.navLink}><FaHome /></a>
                <div style={styles.searchContainer}>
                  <FaSearch style={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Search..."
                      style={styles.searchInput}
                    />
                </div>
                <a href="#" style={styles.navLink}><FaComments /></a>
                <a href="#" style={styles.navLink}><FaUser /></a>
          </nav>
      </header>
      <main style={styles.main}>
        <h2 style={styles.title}>Swap Your Items!</h2>
        <div style={styles.uploadContainer}>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.uploadInput} />
          {image && <img src={image} alt="Uploaded Preview" style={styles.imagePreview} />}
        </div>
        <form style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="productName">ชื่อสินค้า</label>
            <input style={styles.input} type="text" id="productName" name="productName" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="swapItem">สิ่งที่อยากแลก</label>
            <input style={styles.input} type="text" id="swapItem" name="swapItem" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="details">รายละเอียด</label>
            <textarea style={styles.textarea} id="details" name="details" rows={3} />
          </div>
          <button style={styles.button} type="submit">Start Swap</button>
        </form>
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
    height: '120vh',
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
    marginTop: '10px',
    textShadow: '0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ffcc00',  // เปลี่ยนเป็นสีเหลือง
    background: 'linear-gradient(90deg, #ff69b4, #ffb6c1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  uploadContainer: {
    margin: '1rem 0',
    padding: '2rem',
    border: '2px dashed #ffb6c1',
    borderRadius: '10px',
    backgroundColor: '#2e2e4d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  uploadInput: {
    marginBottom: '1rem',
    color: '#ffffff',
  },
  imagePreview: {
    maxWidth: '200px',
    borderRadius: '5px',
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
    width: '70%', 
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    display: 'block',
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ffb6c1',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ffb6c1',
  },
  button: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#f7b267',
    color: '#1a1a2e',
    cursor: 'pointer',
    width: '40%', 
    marginLeft: 'auto',
    marginRight: 'auto',
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

export default SwapPage;
