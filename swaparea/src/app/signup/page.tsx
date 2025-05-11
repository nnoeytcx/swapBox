'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const body = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      confirm_password: form.confirmPassword.value
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.error || JSON.stringify(data));
        return;
      }
  
      alert('Account created!');
      router.push('/login');
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Swap Box</h1>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSignup}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input style={styles.input} type="text" id="username" name="username" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input style={styles.input} type="email" id="email" name="email" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input style={styles.input} type="password" id="password" name="password" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input style={styles.input} type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          <button style={styles.signUpButton} type="submit">Sign up</button>
        </form>
        <p style={styles.signInText}>
          Already have an account? <a href="/login" style={styles.signInLink}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

// ... keep your `styles` as is



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
  signUpButton: {
    backgroundColor: '#f7b267',
    color: '#3f0e40',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  signInText: {
    color: '#ccc',
    marginTop: '1rem',
  },
  signInLink: {
    color: '#f7b267',
    textDecoration: 'none',
  },
};

export default SignUpPage;
