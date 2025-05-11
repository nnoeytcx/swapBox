'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/home');
  };


const onLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('jwt_access', data.access);
    alert("Login success!");
    router.push('/home');
  } catch (error) {
    alert("Your username/password are incorrect!");
  }
};



  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Swap Box</h1>

      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={onLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input style={styles.input} type="text" id="username" name="username" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input style={styles.input} type="password" id="password" name="password" required />
            <a href="#" style={styles.forgotPassword}>Forgot password?</a>
          </div>
          <button style={styles.signInButton} type="submit">Sign in</button>
          <button style={styles.googleButton} type="button">Sign in with Google</button>
        </form>
        <p style={styles.signUpText}>
          Don't have an account? <a href="/signup" style={styles.signUpLink}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a2e',
  },
  formContainer: {
    backgroundColor: '#3f0e40',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4',
    textAlign: 'center',
    width: '400px',              
    maxWidth: '90%'
  },
  title: {
    color: '#fff',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    //textShadow: '0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4', 
    background: 'linear-gradient(90deg, #ff69b4, #ffb6c1)', 
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    color: '#fff',
    textAlign: 'left',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000'
  },
  forgotPassword: {
    display: 'block',
    textAlign: 'right',
    color: '#ffff',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
  signInButton: {
    backgroundColor: '#f7b267',
    color: '#3f0e40',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  googleButton: {
    backgroundColor: '#f7b267',
    color: '#3f0e40',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  signUpText: {
    color: '#ccc',
    marginTop: '1rem',
  },
  signUpLink: {
    color: '#f7b267',
    textDecoration: 'none',
  },
};

export default Page;

