"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const SwapPage: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Append additional fields manually to FormData
    const title = (form.querySelector('input[name="title"]') as HTMLInputElement).value;
    const swap = (form.querySelector('input[name="swap"]') as HTMLInputElement).value;
    const description = (form.querySelector('textarea[name="description"]') as HTMLTextAreaElement).value;
    
    formData.append('title', title);
    formData.append('swap', swap);
    formData.append('description', description);

    const token = localStorage.getItem('jwt_access');
    console.log("Token:", token); 
  
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/upload-item/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      
  const text = await res.text(); // Use text to capture HTML error pages

  try {
    const json = JSON.parse(text); // Try to parse JSON if it is valid
    if (res.ok) {
      alert("Upload success:");
      router.push('/area');
    } else {
      console.error("Upload error:", json);
    }
  } catch {
    console.error("Server error (non-JSON):", text); // Logs 500 HTML
  }

} catch (err) {
  console.error("Fetch failed:", err);
}
  };

  const handleHome = () => router.push('/home');
  const handleProfile = () => router.push('/profile');
  const handleList = () => router.push('/list');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Swap Box</h1>
        <nav style={styles.nav}>
                <a href="#" onClick={handleHome}style={styles.navLink}><FaHome /></a>
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
        <h2 style={styles.title}>Swap Your Items!</h2>
        <form style={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={styles.uploadContainer}>
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.uploadInput}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Uploaded Preview" style={styles.imagePreview} />
            )}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="title">ชื่อสินค้า</label>
            <input style={styles.input} type="text" id="title" name="title" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="swap">สิ่งที่อยากแลก</label>
            <input style={styles.input} type="text" id="swap" name="swap" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="description">รายละเอียด</label>
            <textarea style={styles.textarea} id="description" name="description" rows={3} />
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
