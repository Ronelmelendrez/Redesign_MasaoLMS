import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    } else {
      setError('Please enter both email and password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap');
        :root {
          --csu-green: #1a5c2e;
          --csu-green-dark: #0f3d1e;
          --csu-green-mid: #246b37;
          --csu-green-light: #e8f3ec;
          --csu-green-xlight: #f3f9f5;
          --csu-gold: #c8991a;
          --csu-gold-light: #fdf6e3;
          --csu-cream: #fafaf7;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-display { font-family: var(--font-display); }
        .font-sans { font-family: var(--font-sans); }
        
        body { background: white; }
        
        .login-container { 
          min-height: 100vh; 
          display: flex; 
          align-items: stretch; 
          justify-content: stretch;
        }
        
        /* Left side - Image */
        .login-image-section {
          flex: 1;
          background: linear-gradient(135deg, #0a2d1a 0%, var(--csu-green-dark) 25%, var(--csu-green) 50%, #2d7a44 75%, #1f5a32 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
          min-width: 0;
        }

        .login-image-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(200,153,26,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255,255,255,0.08) 0%, transparent 40%);
          pointer-events: none;
          animation: shimmer 8s ease-in-out infinite;
        }

        .login-image-section::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: float 30s linear infinite;
          opacity: 0.5;
        }

        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(60px, 60px) rotate(360deg); }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .image-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          max-width: 400px;
        }

        .image-icon {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .image-icon svg {
          width: 60px;
          height: 60px;
          color: white;
        }

        .image-title {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 600;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .image-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .image-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 40px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }

        .feature-icon {
          width: 24px;
          height: 24px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 12px;
          height: 12px;
          color: var(--csu-gold);
        }

        /* Right side - Form */
        .login-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: white;
          position: relative;
        }

        .login-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(26,92,46,0.05) 0%, transparent 70%);
          border-radius: 50%;
        }

        .login-form-wrapper {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header-logo {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--csu-green) 0%, var(--csu-green-mid) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .form-header-logo svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .form-header-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 600;
          color: var(--csu-green-dark);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .form-header-subtitle {
          font-size: 15px;
          color: #666;
          font-weight: 500;
        }

        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 13px; font-weight: 700; color: var(--csu-green-dark); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
        .form-input-wrapper { position: relative; }
        .form-input { width: 100%; padding: 12px 16px; background: var(--csu-green-xlight); border: 1.5px solid var(--csu-green-light); border-radius: 12px; font-size: 15px; color: var(--csu-green-dark); font-weight: 500; transition: all 0.3s; font-family: var(--font-sans); }
        .form-input::placeholder { color: var(--csu-green-light); font-weight: 400; }
        .form-input:focus { outline: none; background: white; border-color: var(--csu-green); box-shadow: 0 0 0 3px rgba(26,92,46,0.1); }
        .form-input-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--csu-green-light); cursor: pointer; transition: color 0.2s; width: 18px; height: 18px; }
        .form-input-icon:hover { color: var(--csu-green); }
        
        .form-checkbox { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--csu-green-dark); margin-bottom: 24px; }
        .form-checkbox input { width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid var(--csu-green-light); background: white; cursor: pointer; accent-color: var(--csu-green); }
        
        .form-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 12px 16px; color: #dc2626; font-size: 14px; font-weight: 500; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        
        .btn-login { 
          width: 100%; 
          padding: 14px 24px; 
          background: linear-gradient(135deg, var(--csu-green) 0%, var(--csu-green-mid) 100%); 
          color: white; 
          border: none; 
          border-radius: 12px; 
          font-size: 15px; 
          font-weight: 700; 
          letter-spacing: 0.01em; 
          cursor: pointer; 
          transition: all 0.3s; 
          box-shadow: 0 8px 16px rgba(26,92,46,0.2); 
          font-family: var(--font-sans); 
        }
        .btn-login:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 12px 28px rgba(26,92,46,0.3); 
        }
        .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .form-divider { display: flex; align-items: center; margin: 28px 0; gap: 12px; }
        .form-divider::before, .form-divider::after { content: ''; flex: 1; height: 1px; background: var(--csu-green-light); }
        .form-divider-text { font-size: 13px; color: var(--csu-green-light); font-weight: 600; }
        
        .forgot-link { text-align: center; margin-top: 20px; }
        .forgot-link a { color: var(--csu-green); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s; }
        .forgot-link a:hover { color: var(--csu-gold); }
        
        .demo-credentials { background: var(--csu-green-xlight); border: 1.5px solid var(--csu-green-light); border-radius: 12px; padding: 16px; margin-top: 24px; }
        .demo-label { font-size: 12px; font-weight: 700; color: var(--csu-green-dark); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; display: block; }
        .demo-item { font-size: 13px; color: var(--csu-green-mid); margin-bottom: 4px; }
        .demo-item strong { color: var(--csu-green-dark); font-weight: 700; }
        
        .back-link { 
          display: inline-flex; 
          align-items: center; 
          gap: 6px; 
          color: white; 
          text-decoration: none; 
          font-size: 14px; 
          font-weight: 600; 
          margin-bottom: 32px; 
          transition: all 0.2s; 
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 10;
        }
        .back-link:hover { gap: 10px; }
        .back-link svg { width: 16px; height: 16px; }

        .footer-text { text-align: center; margin-top: 28px; font-size: 13px; color: var(--csu-green-dark); }
        .footer-text a { color: var(--csu-green); text-decoration: none; font-weight: 700; transition: color 0.2s; }
        .footer-text a:hover { color: var(--csu-gold); }

        /* Responsive */
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .login-image-section {
            min-height: 300px;
            flex: none;
          }

          .login-form-section {
            flex: 1;
            padding: 32px 20px;
          }

          .image-title {
            font-size: 36px;
          }

          .form-header-title {
            font-size: 28px;
          }

          .image-features {
            display: none;
          }

          .back-link {
            color: var(--csu-green-dark);
          }
        }
      `}</style>

      <div className="login-container">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="back-link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Left side - Image Section */}
        <div className="login-image-section">
          <div className="image-content">
            <div className="image-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <h1 className="image-title">Welcome to masaoLMS</h1>
            <p className="image-subtitle">Caraga State University Learning Management System</p>
            
            <div className="image-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Access courses anytime, anywhere</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Real-time collaboration with peers</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Track your academic progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form Section */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="form-header">
              <div className="form-header-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h2 className="form-header-title">Sign In</h2>
              <p className="form-header-subtitle">Enter your credentials to access the portal</p>
            </div>

            <form onSubmit={handleLogin}>
              {/* Error message */}
              {error && (
                <div className="form-error">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Email field */}
              <div className="form-group">
                <label className="form-label">Email or Student ID</label>
                <div className="form-input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.rivera@masao.edu"
                    className="form-input"
                  />
                  <Mail className="form-input-icon" />
                </div>
              </div>

              {/* Password field */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="form-input-icon"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me for 30 days
              </label>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-login"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="form-divider">
              <span className="form-divider-text">Need help?</span>
            </div>

            <div className="forgot-link">
              <a href="#">Forgot password?</a> • <a href="#">Contact Support</a>
            </div>

            {/* Demo credentials */}
            <div className="demo-credentials">
              <span className="demo-label">Demo Credentials</span>
              <div className="demo-item">
                Email: <strong>student@masao.edu</strong>
              </div>
              <div className="demo-item">
                Password: <strong>password123</strong>
              </div>
            </div>

            {/* Footer */}
            <div className="footer-text">
              Need to reset your credentials?{' '}
              <a href="https://myschool.carsu.edu.ph/">Visit MySchool</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

