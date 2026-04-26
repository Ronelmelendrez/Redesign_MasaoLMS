import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';

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
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300;1,9..144,500&display=swap');
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
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        body { background: linear-gradient(135deg, var(--csu-green-dark) 0%, var(--csu-green) 50%, #2d7a44 100%); }
        .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .login-card { background: rgba(255,255,255,0.98); backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 20px 60px rgba(15,61,30,0.25); max-width: 440px; width: 100%; overflow: hidden; }
        .login-header { background: linear-gradient(135deg, var(--csu-green) 0%, var(--csu-green-mid) 100%); color: white; padding: 40px 32px; text-align: center; }
        .login-body { padding: 40px 32px; }
        .logo-section { margin-bottom: 24px; }
        .logo-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .logo-icon svg { width: 24px; height: 24px; color: white; }
        .header-title { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 500; margin-bottom: 8px; letter-spacing: -0.02em; }
        .header-subtitle { font-size: 14px; color: rgba(255,255,255,0.85); font-weight: 500; }
        
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 13px; font-weight: 700; color: var(--csu-green-dark); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
        .form-input-wrapper { position: relative; }
        .form-input { width: 100%; padding: 12px 16px; background: var(--csu-green-xlight); border: 1.5px solid var(--csu-green-light); border-radius: 12px; font-size: 15px; color: var(--csu-green-dark); font-weight: 500; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
        .form-input::placeholder { color: var(--csu-green-light); font-weight: 400; }
        .form-input:focus { outline: none; background: white; border-color: var(--csu-gold); box-shadow: 0 0 0 3px rgba(200,153,26,0.1); }
        .form-input-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--csu-green-light); cursor: pointer; transition: color 0.2s; width: 18px; height: 18px; }
        .form-input-icon:hover { color: var(--csu-green); }
        
        .form-checkbox { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--csu-green-dark); margin-bottom: 24px; }
        .form-checkbox input { width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid var(--csu-green-light); background: white; cursor: pointer; accent-color: var(--csu-green); }
        
        .form-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 12px 16px; color: #dc2626; font-size: 14px; font-weight: 500; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        
        .btn-login { width: 100%; padding: 14px 24px; background: linear-gradient(135deg, var(--csu-green) 0%, var(--csu-green-mid) 100%); color: white; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; letter-spacing: 0.01em; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 16px rgba(26,92,46,0.25); font-family: 'Plus Jakarta Sans', sans-serif; }
        .btn-login:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(26,92,46,0.35); }
        .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .form-divider { display: flex; align-items: center; margin: 28px 0; gap: 12px; }
        .form-divider::before, .form-divider::after { content: ''; flex: 1; height: 1px; background: var(--csu-green-light); }
        .form-divider-text { font-size: 13px; color: var(--csu-green-light); font-weight: 600; }
        
        .forgot-link { text-align: center; margin-top: 20px; }
        .forgot-link a { color: var(--csu-gold); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s; }
        .forgot-link a:hover { color: var(--csu-green-dark); }
        
        .demo-credentials { background: var(--csu-green-xlight); border: 1.5px solid var(--csu-green-light); border-radius: 12px; padding: 16px; margin-top: 24px; }
        .demo-label { font-size: 12px; font-weight: 700; color: var(--csu-green-dark); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; display: block; }
        .demo-item { font-size: 13px; color: var(--csu-green-mid); margin-bottom: 4px; }
        .demo-item strong { color: var(--csu-green-dark); font-weight: 700; }
        
        .back-link { display: inline-flex; align-items: center; gap: 6px; color: white; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 32px; transition: all 0.2s; }
        .back-link:hover { gap: 10px; }
        .back-link svg { width: 16px; height: 16px; }
        
        .footer-text { text-align: center; margin-top: 28px; font-size: 13px; color: var(--csu-green-dark); }
        .footer-text a { color: var(--csu-green); text-decoration: none; font-weight: 700; transition: color 0.2s; }
        .footer-text a:hover { color: var(--csu-gold); }
      `}</style>

      <div className="login-container">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="back-link"
          style={{ position: 'absolute', top: 24, left: 24 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Login card */}
        <div className="login-card">
          {/* Header section */}
          <div className="login-header">
            <div className="logo-section">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h1 className="header-title">Welcome to masaoLMS</h1>
              <p className="header-subtitle">Caraga State University</p>
            </div>
          </div>

          {/* Body section */}
          <div className="login-body">
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

