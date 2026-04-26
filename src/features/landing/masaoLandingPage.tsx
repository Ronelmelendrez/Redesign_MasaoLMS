import { useState, useEffect, useRef, ReactNode } from "react";

const NAV_LINKS = [
  { label: "About CSU", href: "https://www.carsu.edu.ph/about-us/" },
  { label: "Academics", href: "https://myadmission.carsu.edu.ph/offered-programs/" },
  { label: "Administration", href: "https://www.carsu.edu.ph/executive-committee/" },
  { label: "Research", href: "https://www.carsu.edu.ph/ovprdie/" },
];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Course Content Access",
    desc: "Access lecture notes, readings, videos, and simulations — available 24/7 to fit your schedule.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Communication Tools",
    desc: "Discussion boards, messaging, and live chat connect you directly with instructors and classmates.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: "Assignment Submission",
    desc: "Submit work digitally and receive instructor feedback and grades electronically.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Collaborative Learning",
    desc: "Group projects, forums, and document editing tools foster teamwork and interpersonal skills.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Assessments & Quizzes",
    desc: "Take online quizzes with instant feedback and automated grading to gauge your understanding.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Progress Tracking",
    desc: "Monitor grades, attendance, and participation to take ownership of your learning journey.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Activate Your CSU Email",
    desc: "Log in to MySchool and navigate to Google Apps Account to activate your Caraga State University email address.",
    link: "https://myschool.carsu.edu.ph/",
    linkLabel: "Go to MySchool →",
  },
  {
    num: "02",
    title: "Get Your Credentials",
    desc: "Find your username (ID number) and temporary password (birthday) under My Class Schedule in MySchool.",
    link: "https://myschool.carsu.edu.ph/",
    linkLabel: "Access MySchool →",
  },
  {
    num: "03",
    title: "Log In to masaoLMS",
    desc: "Visit masaolms.carsu.edu.ph, click Log In, and enter your credentials. Change your password on first login.",
    link: "#login",
    linkLabel: "Log In Now →",
  },
];

const STATS = [
  { value: "10,000+", label: "Students Enrolled" },
  { value: "500+", label: "Active Courses" },
  { value: "200+", label: "Faculty Members" },
  { value: "24/7", label: "Platform Access" },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

interface AnimSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function AnimSection({ children, className = "", delay = 0 }: AnimSectionProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function MasaoLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>
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
        .btn-primary {
          background: var(--csu-green);
          color: white;
          padding: 14px 32px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none;
          border: none; cursor: pointer;
        }
        .btn-primary:hover { background: var(--csu-green-dark); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(26,92,46,0.25); }
        .btn-outline {
          background: transparent;
          color: white;
          padding: 13px 32px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 15px;
          border: 1.5px solid rgba(255,255,255,0.55);
          transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; cursor: pointer;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.12); border-color: white; }
        .hero-bg {
          background: linear-gradient(155deg, var(--csu-green-dark) 0%, var(--csu-green) 45%, #2d7a44 100%);
          position: relative; overflow: hidden;
        }
        .hero-pattern {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px, 45px 45px;
        }
        .hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,153,26,0.12) 0%, transparent 70%);
          top: -200px; right: -200px;
        }
        .hero-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          bottom: -100px; left: -100px;
        }
        .stat-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s;
        }
        .stat-card:hover { background: rgba(255,255,255,0.13); transform: translateY(-2px); }
        .feature-card {
          background: white;
          border: 1px solid #e8f0eb;
          border-radius: 20px;
          padding: 28px;
          transition: box-shadow 0.25s, transform 0.2s, border-color 0.2s;
        }
        .feature-card:hover {
          box-shadow: 0 12px 40px rgba(26,92,46,0.10);
          transform: translateY(-3px);
          border-color: #b8dbc4;
        }
        .step-number {
          font-family: 'Fraunces', serif;
          font-size: 56px;
          font-weight: 300;
          color: var(--csu-green-light);
          line-height: 1;
          letter-spacing: -2px;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color 0.15s;
          letter-spacing: 0.01em;
        }
        .nav-link:hover { color: white; }
        .scrolled-nav {
          background: rgba(10,40,20,0.95) !important;
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06);
        }
        .mobile-menu {
          background: var(--csu-green-dark);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .badge {
          background: var(--csu-gold-light);
          color: var(--csu-gold);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 999px;
          display: inline-block;
          text-transform: uppercase;
        }
        .section-label {
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--csu-green);
        }
        .divider-leaf {
          width: 48px; height: 3px;
          background: linear-gradient(90deg, var(--csu-green), var(--csu-gold));
          border-radius: 99px;
          display: inline-block;
        }
        .footer-link { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.15s; }
        .footer-link:hover { color: rgba(255,255,255,0.9); }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-anim { animation: float 6s ease-in-out infinite; }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        .float-anim-2 { animation: float2 8s ease-in-out infinite; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? undefined : "transparent" }}
        data-scrolled={scrolled}
      >
        <div
          className={`transition-all duration-300 ${scrolled ? "scrolled-nav" : ""}`}
          style={{ background: scrolled ? "rgba(10,40,20,0.95)" : "transparent" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <a href="https://masaolms.carsu.edu.ph" className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <span className="text-white font-display font-700 text-lg leading-none" style={{ fontFamily: "Fraunces, serif", fontWeight: 700 }}>masao</span>
                <span className="text-white font-sans font-600 text-lg leading-none">LMS</span>
                <p className="text-xs leading-none mt-0.5" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: "0.04em" }}>Caraga State University</p>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="/login" className="btn-outline" style={{ padding: "10px 22px", fontSize: "14px" }}>
                Log In
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            >
              {mobileMenuOpen
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu lg:hidden px-6 pb-6 pt-2 space-y-4">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="block text-white font-500 py-2" style={{ fontWeight: 500 }}>{l.label}</a>
              ))}
              <a href="/login" className="btn-primary block text-center mt-4" style={{ justifyContent: "center" }}>
                Log In to masaoLMS
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-bg min-h-screen flex flex-col justify-center relative">
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        {/* Decorative floating shapes */}
        <div className="float-anim absolute right-16 top-1/4 hidden xl:block" style={{ opacity: 0.12 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="88" stroke="white" strokeWidth="1.5" strokeDasharray="8 6" />
            <circle cx="90" cy="90" r="60" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="float-anim-2 absolute left-12 bottom-1/4 hidden xl:block" style={{ opacity: 0.08 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="2" y="2" width="116" height="116" rx="20" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <div className="mb-6">
                <span className="badge">🌿 Official Learning Platform of CSU</span>
              </div>

              <h1
                className="font-display text-white leading-tight mb-6"
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(40px, 5.5vw, 68px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              >
                Your Academic
                <br />
                World,{" "}
                <span style={{ color: "#f0c842", fontStyle: "italic" }}>All in One</span>
                <br />
                Platform
              </h1>

              <p className="mb-10 max-w-lg" style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", lineHeight: "1.7", fontWeight: 400 }}>
                masaoLMS is the official learning management system of Caraga State University — where students access courses, submit work, connect with faculty, and track their academic growth.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <a href="/login" className="btn-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Log In to masaoLMS
                </a>
                <a href="#getting-started" className="btn-outline">
                  Getting Started Guide
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="stat-card">
                    <p className="text-white font-display text-2xl font-500 mb-1" style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}>{s.value}</p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.03em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side — decorative LMS card mockup */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="float-anim relative" style={{ maxWidth: 420 }}>
                {/* Main card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)" }}>
                  {/* Card header */}
                  <div style={{ background: "var(--csu-green)", padding: "20px 24px" }} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                      </div>
                      <div>
                        <p className="text-white font-600 text-sm" style={{ fontWeight: 600 }}>My Dashboard</p>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px" }}>AY 2024–2025, 2nd Semester</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden" style={{ background: "#b8dbc4" }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="white" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    </div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: "20px 24px" }}>
                    <p className="text-xs font-600 mb-3" style={{ color: "var(--csu-green)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Enrolled Courses</p>
                    {[
                      { code: "CS 301", title: "Data Structures", progress: 72, color: "#1a5c2e" },
                      { code: "MATH 201", title: "Discrete Math", progress: 55, color: "#c8991a" },
                      { code: "CS 315", title: "Database Systems", progress: 88, color: "#2d7a44" },
                    ].map((c) => (
                      <div key={c.code} className="mb-3 p-3 rounded-2xl" style={{ background: "var(--csu-green-xlight)", border: "1px solid #e0ede5" }}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-xs font-700" style={{ color: c.color, fontWeight: 700 }}>{c.code}</span>
                            <p className="text-sm font-500 mt-0.5" style={{ color: "#1a2e22", fontWeight: 600 }}>{c.title}</p>
                          </div>
                          <span className="text-lg font-display" style={{ fontFamily: "Fraunces, serif", color: c.color, fontWeight: 500 }}>{c.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#d4e8d9" }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${c.progress}%`, background: c.color }} />
                        </div>
                      </div>
                    ))}
                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[
                        { label: "Assignments", icon: "📋" },
                        { label: "Quizzes", icon: "✏️" },
                        { label: "Messages", icon: "💬" },
                      ].map((a) => (
                        <div key={a.label} className="rounded-xl p-3 text-center" style={{ background: "var(--csu-green-light)", border: "1px solid #c4ddc9" }}>
                          <div style={{ fontSize: "18px", marginBottom: "4px" }}>{a.icon}</div>
                          <p style={{ fontSize: "11px", color: "var(--csu-green)", fontWeight: 600 }}>{a.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating notification badge */}
                <div
                  className="absolute -top-4 -right-4 rounded-2xl shadow-xl px-4 py-3 float-anim-2"
                  style={{ background: "white", border: "1px solid #e8f0eb", minWidth: 160 }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#e8f3ec" }}>
                      <svg className="w-4 h-4" style={{ color: "var(--csu-green)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#6b8f76", fontWeight: 500 }}>New submission graded</p>
                      <p style={{ fontSize: "13px", color: "#1a2e22", fontWeight: 700 }}>CS 301 — 92/100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 72L60 60C120 48 240 24 360 18C480 12 600 24 720 30C840 36 960 36 1080 30C1200 24 1320 12 1380 6L1440 0V72H1380C1320 72 1200 72 1080 72C960 72 840 72 720 72C600 72 480 72 360 72C240 72 120 72 60 72H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24" style={{ background: "var(--csu-cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <span className="section-label">Platform Features</span>
            <div className="divider-leaf mx-auto my-4" />
            <h2 className="font-display text-4xl sm:text-5xl" style={{ fontFamily: "Fraunces, serif", fontWeight: 500, color: "#0f2b18", letterSpacing: "-0.02em" }}>
              Everything you need to learn,<br />
              <em style={{ fontStyle: "italic", color: "var(--csu-green)" }}>all in one place</em>
            </h2>
            <p className="mt-4 mx-auto max-w-xl" style={{ color: "#5a7a65", fontSize: "17px", lineHeight: "1.65" }}>
              masaoLMS brings together the tools, content, and communication channels that empower every CSU student.
            </p>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <AnimSection key={f.title} delay={i * 80}>
                <div className="feature-card h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "var(--csu-green-light)", color: "var(--csu-green)" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-600 text-lg mb-3" style={{ color: "#0f2b18", fontWeight: 700 }}>{f.title}</h3>
                  <p style={{ color: "#5a7a65", fontSize: "15px", lineHeight: "1.65" }}>{f.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── GETTING STARTED ── */}
      <section id="getting-started" className="py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <span className="section-label">Quick Start Guide</span>
            <div className="divider-leaf mx-auto my-4" />
            <h2 className="font-display text-4xl sm:text-5xl" style={{ fontFamily: "Fraunces, serif", fontWeight: 500, color: "#0f2b18", letterSpacing: "-0.02em" }}>
              Up and running in<br />
              <em style={{ fontStyle: "italic", color: "var(--csu-green)" }}>three simple steps</em>
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--csu-green-light), transparent)" }}
            />
            {STEPS.map((s, i) => (
              <AnimSection key={s.num} delay={i * 100} className="relative">
                <div className="p-8 rounded-3xl h-full" style={{ background: "var(--csu-green-xlight)", border: "1px solid #d6eadc" }}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="step-number">{s.num}</span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-700 text-white"
                      style={{ background: "var(--csu-green)", fontWeight: 700, flexShrink: 0 }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl mb-3" style={{ color: "#0f2b18", fontWeight: 700, lineHeight: 1.3 }}>{s.title}</h3>
                  <p className="mb-5" style={{ color: "#5a7a65", fontSize: "15px", lineHeight: "1.65" }}>{s.desc}</p>
                  <a
                    href={s.link}
                    className="inline-flex items-center gap-1.5 font-600 text-sm"
                    style={{ color: "var(--csu-green)", fontWeight: 700, textDecoration: "none" }}
                  >
                    {s.linkLabel}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </a>
                </div>
              </AnimSection>
            ))}
          </div>

          {/* Mobile app callout */}
          <AnimSection className="mt-12">
            <div className="rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6" style={{ background: "var(--csu-green)", color: "white" }}>
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "6px" }}>Available on Mobile</p>
                <h3 className="text-2xl mb-2" style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}>Learn anywhere with the Moodle app</h3>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "15px" }}>Access masaoLMS on iOS and Android. Download Moodle and connect to <strong style={{ color: "white" }}>masaolms.carsu.edu.ph</strong></p>
              </div>
              <div className="flex gap-3 flex-shrink-0 flex-wrap justify-center">
                <a href="https://play.google.com/store/apps/details?id=com.moodle.moodlemobile" className="btn-outline" style={{ fontSize: "13px", padding: "10px 18px" }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2.45 2.45 0 001.56-.59L14.4 17l-2.95-2.96-8.26 9.72zM20.84 10.3L17.4 8.28 14.08 11.6l3.3 3.3 3.48-2a1.72 1.72 0 000-2.6zM3 .24A2.44 2.44 0 002 2v20a2.44 2.44 0 001 1.76L14.08 12.6z"/><path d="M14.4 7l-9.66-6.17A2.44 2.44 0 003 .24L14.08 11.4z"/></svg>
                  Android
                </a>
                <a href="https://apps.apple.com/us/app/moodle/id633359593" className="btn-outline" style={{ fontSize: "13px", padding: "10px 18px" }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  iOS
                </a>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24" style={{ background: "var(--csu-cream)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimSection>
            <div
              className="rounded-3xl px-8 py-14 sm:py-20 relative overflow-hidden"
              style={{ background: "var(--csu-green-dark)" }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 30%, rgba(200,153,26,0.1) 0%, transparent 60%)" }} />
              <div className="relative z-10">
                <span className="badge" style={{ background: "rgba(200,153,26,0.2)", color: "#f0c842" }}>Ready to Begin?</span>
                <h2
                  className="mt-4 mb-5"
                  style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(32px, 4vw, 52px)", color: "white", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  Start your learning journey<br />
                  <em style={{ fontStyle: "italic", color: "#f0c842" }}>today at masaoLMS</em>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px", maxWidth: "500px", margin: "0 auto 36px", lineHeight: "1.65" }}>
                  Join thousands of CSU students already learning on the platform. Log in with your student credentials to get started.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/login" className="btn-primary" style={{ background: "white", color: "var(--csu-green-dark)" }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                    Log In to masaoLMS
                  </a>
                  <a href="https://masaolms.carsu.edu.ph/mod/forum/view.php?f=2" className="btn-outline">
                    View Announcements
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a2410", color: "white" }}>
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "18px" }}>masao</span>
                  <span style={{ fontWeight: 600, fontSize: "18px" }}>LMS</span>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: "1.7", maxWidth: "320px" }}>
                The official learning management system of Caraga State University. Competence, Service, and Uprightness.
              </p>
              <p className="mt-4" style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
                📧 <a href="mailto:masaolms@carsu.edu.ph" className="footer-link" style={{ color: "rgba(255,255,255,0.5)" }}>masaolms@carsu.edu.ph</a>
              </p>
            </div>

            <div>
              <p className="mb-4 text-sm font-700" style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>University</p>
              <div className="space-y-3">
                {[
                  { label: "About CSU", href: "https://www.carsu.edu.ph/about-us/" },
                  { label: "Academic Programs", href: "https://myadmission.carsu.edu.ph/offered-programs/" },
                  { label: "Administration", href: "https://www.carsu.edu.ph/executive-committee/" },
                  { label: "Research & Development", href: "https://www.carsu.edu.ph/ovprdie/" },
                  { label: "Student Life", href: "https://www.carsu.edu.ph/" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="block footer-link">{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-700" style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Quick Links</p>
              <div className="space-y-3">
                {[
                  { label: "Log In to masaoLMS", href: "https://masaolms.carsu.edu.ph/login/index.php" },
                  { label: "MySchool Portal", href: "https://myschool.carsu.edu.ph/" },
                  { label: "Announcements & Updates", href: "https://masaolms.carsu.edu.ph/mod/forum/view.php?f=2" },
                  { label: "MIS Support (Facebook)", href: "https://www.facebook.com/carsu.mis/" },
                  { label: "Download Moodle App", href: "https://download.moodle.org/mobile" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="block footer-link">{l.label}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
                © {new Date().getFullYear()} Caraga State University. All Rights Reserved.
              </p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>
                Powered by{" "}
                <a href="https://moodle.org" style={{ color: "rgba(255,255,255,0.45)" }} className="footer-link">Moodle</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}