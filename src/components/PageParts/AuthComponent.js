import React, { useState, useEffect, useRef } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import './AuthComponent.css';
import authService from '../Services/authService';
import Guide from '../PagesSlice/Guide';

const AuthComponent = ({ isOpen, onClose, initialMode = 'signup', onLoginSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    nickname: '',
    contact: '',
    password: '',
  });
  const [signinFormData, setSigninFormData] = useState({
    nickname: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationTimer, setConfirmationTimer] = useState(300);
  const [canResendCode, setCanResendCode] = useState(false);

  const [resetPasswordFormData, setResetPasswordFormData] = useState({
    identifier: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetPasswordTimer, setResetPasswordTimer] = useState(180);
  const [canResendResetCode, setCanResendResetCode] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const serverErrorRef = useRef(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        if (registrationStep === 'success') {
          setRegistrationStep('form');  
        }
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, registrationStep]);

  useEffect(() => {
    let timer;
    if (registrationStep === 'confirmation' && confirmationTimer > 0) {
      timer = setInterval(() => {
        setConfirmationTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (confirmationTimer === 0) {
      setCanResendCode(true);
    }
    return () => clearInterval(timer);
  }, [registrationStep, confirmationTimer]);

  useEffect(() => {
    let timer;
    if (registrationStep === 'reset-password-confirm' && resetPasswordTimer > 0) {
      timer = setInterval(() => {
        setResetPasswordTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resetPasswordTimer === 0) {
      setCanResendResetCode(true);
    }
    return () => clearInterval(timer);
  }, [registrationStep, resetPasswordTimer]);

  useEffect(() => {
    setErrors({ ...errors, server: '' });
  }, [mode]);

  useEffect(() => {
    if (serverErrorRef.current) {
      const signInLink = serverErrorRef.current.querySelector('.auth-link');
      if (signInLink) {
        signInLink.onclick = () => setMode('signin');
      }
    }
  }, [errors.server]);

  const handleServerError = (error) => {
    let errorMessage = error.message;
    if (errorMessage.length > 70) {
      errorMessage = 'FATAL ERROR';
    }
    setErrors({ ...errors, server: errorMessage });
  };

  const validateIdentifier = (contact) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/;

    if (emailRegex.test(contact) || phoneRegex.test(contact) || usernameRegex.test(contact)) {
      return "";
    } else {
      return "Please enter a valid email, phone number, or username";
    }
  };

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 15) {
      return "Username must not exceed 15 characters";
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_-]+$/.test(username)) {
      return "Username must start with a letter and can only contain letters, numbers, underscores, and hyphens";
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
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[\W_]/.test(password)) {
      return "Password must contain at least one non-alphanumeric character";
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
    if (mode === 'signup') {
      setSignupFormData({ ...signupFormData, [name]: value });
    } else {
      setSigninFormData({ ...signinFormData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    const formData = mode === 'signup' ? signupFormData : signinFormData;

    if (mode === 'signup') {
      newErrors.nickname = validateUsername(formData.nickname);
      newErrors.contact = validateContact(formData.contact);
      newErrors.password = validatePassword(formData.password);
    } else {
      newErrors.nickname = validateIdentifier(formData.nickname);
      newErrors.password = validatePassword(formData.password);
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === "")) {
      setIsLoading(true);
      try {
        if (mode === 'signup') {
          await authService.register(formData.nickname, formData.contact, formData.password);
          setRegistrationStep('confirmation');
          setConfirmationTimer(300);
          setCanResendCode(false);
          setErrors({});
        } else {
          const user = await authService.login(formData.nickname, formData.password);
          if (user) {
            onLoginSuccess(authService.getCurrentUser());
            onClose();
          }
        }
      } catch (error) {
        let errorMessage = error.message;
        if (errorMessage.length > 50) {
          errorMessage = 'FATAL ERROR';
        }
        if (errorMessage === 'This email is already registered.') {
          errorMessage = `This email is already registered. Want to <span class="auth-link">Sign in</span>?`;
        }
        setErrors({ ...errors, server: errorMessage });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (confirmationCode.length !== 6) {
        newErrors.confirmationCode = 'The confirmation code must be exactly 6 characters long.';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    try {
        const response = await authService.confirmRegistration(
            signupFormData.contact,
            signupFormData.nickname,
            signupFormData.password,
            confirmationCode
        );

        if (typeof response === 'string' && response.trim() === "Registration completed successfully.") {
            setRegistrationStep('success');
            await autoLoginAfterRegistration();
        } else if (typeof response === 'object' && response.message === "Registration completed successfully.") {
            setRegistrationStep('success');
            await autoLoginAfterRegistration();
        } else {
            throw new Error(typeof response === 'string' ? response : JSON.stringify(response));
        }
    } catch (error) {
        handleServerError(error);
    } finally {
        setIsLoading(false);
    }
};


  const autoLoginAfterRegistration = async () => {
    try {
      await authService.login(signupFormData.nickname, signupFormData.password);
      const user = authService.getCurrentUser();
      if (user) {
        onLoginSuccess(user);
      }
    } catch (error) {
      console.error("Auto-login failed:", error);
      setErrors({ ...errors, server: "Registration successful, but auto-login failed. Please sign in manually." });
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await authService.register(signupFormData.nickname, signupFormData.contact, signupFormData.password);
      setConfirmationTimer(300);
      setCanResendCode(false);
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  if (!isOpen) return null;

  const renderLoadingDots = () => {
    return (
      <span className="loading-dots">
        <span> </span><span> </span><span> </span>
      </span>
    );
  };

  const renderForm = () => (
    <div className={`auth-form-container ${mode}`}>
      <form onSubmit={handleSubmit} className="auth-form auth-form-signup">
        <div className="auth-form-group">
          <label htmlFor="signup-nickname">Your nickname</label>
          <input
            type="text"
            id="signup-nickname"
            name="nickname"
            value={signupFormData.nickname}
            onChange={handleInputChange}
            placeholder="Please type here your username..."
            className={errors.nickname ? 'auth-error' : ''}
          />
          {errors.nickname && <p className="auth-error-message">{errors.nickname}</p>}
        </div>
        <div className="auth-form-group">
          <label htmlFor="contact">Email or phone number</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={signupFormData.contact}
            onChange={handleInputChange}
            placeholder="Please type here your email or phone number..."
            className={errors.contact ? 'auth-error' : ''}
          />
          {errors.contact && <p className="auth-error-message">{errors.contact}</p>}
        </div>
        <div className="auth-form-group">
          <label htmlFor="signup-password">Password</label>
          <div className="auth-password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="signup-password"
              name="password"
              value={signupFormData.password}
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
        <button type="submit" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? <span>Loading{renderLoadingDots()}</span> : 'Join us'}
        </button>
      </form>
      <form onSubmit={handleSubmit} className="auth-form auth-form-signin">
        <div className="auth-form-group">
          <label htmlFor="signin-nickname">Your nickname</label>
          <input
            type="text"
            id="signin-nickname"
            name="nickname"
            value={signinFormData.nickname}
            onChange={handleInputChange}
            placeholder="Please type here your username..."
            className={errors.nickname ? 'auth-error' : ''}
          />
          {errors.nickname && <p className="auth-error-message">{errors.nickname}</p>}
        </div>
        <div className="auth-form-group">
          <label htmlFor="signin-password">Password</label>
          <div className="auth-password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="signin-password"
              name="password"
              value={signinFormData.password}
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
        <button type="button" className="auth-forgot-password" onClick={handleForgotPassword}>
          Forgot password?
        </button>
        <button type="submit" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? <span>Loading{renderLoadingDots()}</span> : 'Sign in'}
        </button>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className={`auth-confirmation ${registrationStep === 'confirmation' ? 'show' : ''}`}>
      <div>
        <h2 className="auth-confirmation-title">Enter Confirmation Code</h2>
        <p className="auth-confirmation-description">Please enter the confirmation code sent to you.</p>
      </div>
      <form onSubmit={handleConfirmationSubmit} className="auth-confirmation-form">
        <input
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter code"
          className="auth-confirmation-input"
        />
        {errors.confirmationCode && (
          <p className="auth-error-message">{errors.confirmationCode}</p>
        )}
        <div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="auth-confirmation-submit"
        >
          {isLoading ? (
            <>
              Verifying
              <span className="loading-dots">
                <span> </span><span> </span><span> </span>
              </span>
            </>
          ) : (
            'Verify'
          )}
        </button>
          <p className={`auth-confirmation-timer ${confirmationTimer === 0 ? 'timer-disabled' : ''}`}>
            Code expires in: {Math.floor(confirmationTimer / 60)}:
            {confirmationTimer % 60 < 10 ? '0' : ''}
            {confirmationTimer % 60}
          </p>
        </div>
      </form>
      <button
        className={`auth-resend-code ${!canResendCode || isLoading ? 'disabled' : ''}`}
        onClick={handleResendCode}
        disabled={!canResendCode || isLoading}
      >
        {isLoading ? (
          <span>
            Sending<span className="loading-dots">{renderLoadingDots()}</span>
          </span>
        ) : (
          'Resend Code'
        )}
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className={`auth-success ${registrationStep === 'success' ? 'show' : ''}`}>
      <div>
        <h2 className="auth-success-title">Congratulations!</h2>
        <p className="auth-success-description">Your registration has been completed successfully.</p>
      </div>
      <button 
        onClick={() => {
          setShowGuide(true);
          setRegistrationStep('form');
        }}
        className="auth-success-button"
      >
        See the guide
      </button>
    </div>
  );

  const handleForgotPassword = () => {
    setRegistrationStep('reset-password');
  };

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault(); 
    let newErrors = {};
    newErrors.identifier = validateIdentifier(resetPasswordFormData.identifier);
    setErrors(newErrors);
  
    if (Object.values(newErrors).every(error => error === '')) {
      try {
        setIsLoading(true);
        const response = await authService.requestPasswordReset(resetPasswordFormData.identifier);

        setResetPasswordFormData(prevState => ({
          ...prevState,
          identifier: response.identifier
        }));

        setRegistrationStep('reset-password-confirm');
        setResetPasswordTimer(180);
        setCanResendResetCode(false);
      } catch (error) {
        handleServerError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  
  const handleResetPasswordConfirmation = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (resetPasswordFormData.code.length !== 6) {
        newErrors.code = 'Confirmation code must be 6 characters long.';
    }

    newErrors.identifier = validateIdentifier(resetPasswordFormData.identifier);
    newErrors.newPassword = validatePassword(resetPasswordFormData.newPassword);

    if (resetPasswordFormData.newPassword !== resetPasswordFormData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === '')) {
        try {
            setIsLoading(true);
            const response = await authService.resetPassword(
                resetPasswordFormData.identifier,
                resetPasswordFormData.code,
                resetPasswordFormData.newPassword
            );
            
            if (typeof response === 'string' && response.trim() === "Password successfully reset.") {
              setRegistrationStep('reset-password-success');
            } else if (typeof response === 'object' && response.message === "Password successfully reset.") {
              setRegistrationStep('reset-password-success');
            } else {
              throw new Error(typeof response === 'string' ? response : JSON.stringify(response));
            }
        } catch (error) {
            handleServerError(error);
        } finally {
            setIsLoading(false);
        }
    }
};


  

  const handleResendResetCode = async () => {
    try {
      setIsLoading(true);
      await authService.requestPasswordReset(resetPasswordFormData.identifier);
      setResetPasswordTimer(180);
      setCanResendResetCode(false);
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResetPassword = () => (
    <div className={`auth-reset-password ${registrationStep === 'reset-password' ? 'show' : ''}`}>
      <h2 className="auth-reset-password-title">Reset Password</h2>
        <form onSubmit={handleResetPasswordRequest} className="auth-reset-password-form">
          <div className="auth-form-group">
            <label htmlFor="reset-identifier">Email or Phone Number</label>
            <input
              type="text"
              id="reset-identifier"
              name="identifier"
              value={resetPasswordFormData.identifier}
              onChange={(e) => setResetPasswordFormData({ ...resetPasswordFormData, identifier: e.target.value })}
              placeholder="Enter your email or phone number"
              className={errors.identifier ? 'auth-error' : ''}
            />
            {errors.identifier && <p className="auth-error-message">{errors.identifier}</p>}
          </div>
          <button type="submit" className="auth-submit-button" disabled={isLoading}>
            {isLoading ? (
              <>
                Sending
                <span className="loading-dots">
                  <span> </span><span> </span><span> </span>
                </span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      <button
        className={`auth-reset-password-back ${registrationStep !== 'reset-password' ? 'show' : ''}`}
        onClick={() => setRegistrationStep('form')}
      >
        <span>Back</span>
      </button>
    </div>
  );

  const renderResetPasswordConfirm = () => (
    <div className={`auth-reset-password-confirm ${registrationStep === 'reset-password-confirm' ? 'show' : ''}`}>
      <h2 className="auth-reset-password-title">Reset Password</h2>
      <p className="auth-success-description">You have resived confirmation code.</p>
      <form onSubmit={handleResetPasswordConfirmation} className="auth-reset-password-form">
        <div className="auth-form-group">
          <label htmlFor="reset-code">Confirmation Code</label>
          <input
            type="text"
            id="reset-code"
            name="code"
            value={resetPasswordFormData.code}
            onChange={(e) => setResetPasswordFormData({ ...resetPasswordFormData, code: e.target.value })}
            placeholder="Enter the code"
            className={errors.code ? 'auth-error' : ''}
          />
          {errors.code && <p className="auth-error-message">{errors.code}</p>}
        </div>
        <div className="auth-form-group">
          <label htmlFor="new-password">New Password</label>
          <div className="auth-password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-password"
              name="newPassword"
              value={resetPasswordFormData.newPassword}
              onChange={(e) => setResetPasswordFormData({ ...resetPasswordFormData, newPassword: e.target.value })}
              placeholder="Enter a new password"
              className={errors.newPassword ? 'auth-error' : ''}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="auth-password-toggle"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {errors.newPassword && <p className="auth-error-message">{errors.newPassword}</p>}
        </div>
        <div className="auth-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={resetPasswordFormData.confirmPassword}
            onChange={(e) => setResetPasswordFormData({ ...resetPasswordFormData, confirmPassword: e.target.value })}
            placeholder="Confirm your new password"
            className={errors.confirmPassword ? 'auth-error' : ''}
          />
          {errors.confirmPassword && <p className="auth-error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? (
            <>
              Verifying
              <span className="loading-dots">
                <span> </span><span> </span><span> </span>
              </span>
            </>
          ) : (
            'Verify'
          )}
        </button>
        <div className={`auth-confirmation-timer ${resetPasswordTimer === 0 ? 'timer-disabled' : ''}`}>
          Code expires in: {Math.floor(resetPasswordTimer / 60)}:
          {resetPasswordTimer % 60 < 10 ? '0' : ''}
          {resetPasswordTimer % 60}
        </div>
      </form>
      <button
        className={`auth-resend-code ${!canResendResetCode || isLoading ? 'disabled' : ''}`}
        onClick={handleResendResetCode}
        disabled={!canResendResetCode || isLoading}
      >
        {isLoading ? (
          <span>
            Sending<span className="loading-dots">{renderLoadingDots()}</span>
          </span>
        ) : (
          'Resend Code'
        )}
      </button>
    </div>
  );


  const renderResetPasswordSuccess = () => (
    <div className={`auth-reset-password-success ${registrationStep === 'reset-password-success' ? 'show' : ''}`}>
      <div className="auth-success">
        <h2 className="auth-success-title">Password Reset Successful</h2>
        <p className="auth-success-description">Your password has been reset. You can now sign in with your new password.</p>
        <button onClick={() => {
          setRegistrationStep('form');
          setMode('signin');
          }} className="auth-success-button">
          Sign In
        </button>
      </div>
    </div>
  );

  const handleCloseAuth = () => {
    if (registrationStep === 'success') {
      setRegistrationStep('form');  
    }
    onClose();
  };

  const handleGuideClose = () => {
    setShowGuide(false);
    onClose(); 
  };

  return (
    <>
      {showGuide ? (
        <Guide onClose={handleGuideClose} />
      ) : (
      <div className="auth-overlay">
        <div className="auth-modal">
          <button onClick={handleCloseAuth} className="auth-close-button">&times;</button>
          {registrationStep === 'form' && (
            <>
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
              {renderForm()}
            </>
          )}
          {registrationStep === 'confirmation' && renderConfirmation()}
          {registrationStep === 'success' && renderSuccess()}
          {registrationStep === 'reset-password'&& renderResetPassword()}
          {registrationStep === 'reset-password-confirm' && renderResetPasswordConfirm()}
          {registrationStep === 'reset-password-success' && renderResetPasswordSuccess()}
          {errors.server && (
            <p
              className="auth-error-message server-error"
              dangerouslySetInnerHTML={{ __html: errors.server }}
              ref={serverErrorRef} 
            ></p>
          )}
        </div>
      </div>
     )}
    </>
  );
};

export default AuthComponent;
