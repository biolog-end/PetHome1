import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import './AuthComponent.css';

const AuthComponent = ({ isOpen, onClose, initialMode = 'signup' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    contact: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);


  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 15) {
      return "Username must not exceed 15 characters";
    }
    if (!/^[a-z0-9_-]+$/.test(username)) {
      return "Username can only contain lowercase letters, numbers, underscores, and hyphens";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(password) && !/\W/.test(password)) {
      return "Password must contain at least one number or special character";
    }
    return "";
  };

  const validateContact = (contact) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (emailRegex.test(contact) || phoneRegex.test(contact)) {
      return "";
    } else {
      return "Please enter a valid email or phone number";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (mode === 'signup') {
      newErrors.nickname = validateUsername(formData.nickname);
      newErrors.contact = validateContact(formData.contact);
    } else {
      newErrors.nickname = validateUsername(formData.nickname);
    }
    newErrors.password = validatePassword(formData.password);

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === "")) {
      console.log('Form submitted:', formData);
      onClose();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => alert("Forgot password functionality not implemented yet.");

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button onClick={onClose} className="auth-close-button">&times;</button>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
          <button
            className={`auth-tab ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => setMode('signin')}
          >
            Sign in
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="nickname">Your nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder={`Please type here your username...`}
              className={errors.nickname ? 'auth-error' : ''}
            />
            {errors.nickname && <p className="auth-error-message">{errors.nickname}</p>}
          </div>
          {mode === 'signup' && (
            <div className="auth-form-group">
              <label htmlFor="contact">Email or phone number</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Please type here your email or phone number..."
                className={errors.contact ? 'auth-error' : ''}
              />
              {errors.contact && <p className="auth-error-message">{errors.contact}</p>}
            </div>
          )}
          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <div className="auth-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Please type here your password..."
                className={errors.password ? 'auth-error' : ''}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="auth-password-toggle"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.password && <p className="auth-error-message">{errors.password}</p>}
          </div>
          {mode === 'signup' && (
            <p className="auth-password-hint">*at least 8 characters, including a number</p>
          )}
          {mode === 'signin' && (
            <button type="button" className="auth-forgot-password" onClick={handleForgotPassword}>
              Forgot password?
            </button>
          )}
          <button type="submit" className="auth-submit-button">
            {mode === 'signup' ? 'Join us' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;