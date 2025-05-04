"use client";
import React, {useState} from 'react';

const HomePage: React.FC = () => {
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
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>Search</a>
          <a href="#" style={styles.navLink}>Chat</a>
          <a href="#" style={styles.navLink}>Profile</a>
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
    justifyContent: 'center',
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
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  uploadContainer: {
    margin: '1rem 0',
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
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
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
  },
};

export default HomePage;
