import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Telescope, Sparkles, BookOpen, Network, BarChart3, Blocks } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CognivisLogo } from '../../components/common/CognivisLogo';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, continueAsGuest, startDemoMode } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp({ name, email, password, confirmPassword });
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Account creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/home');
  };

  const handleDemo = () => {
    startDemoMode();
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center lg:justify-between lg:px-24 overflow-hidden bg-[#050806] font-sans text-[#F7F4EB] selection:bg-emerald-500/30">
      
      {/* 1. Full-Screen Cinematic Environment */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/observatory-hero.jpg"
          alt="Knowledge Observatory"
          className="w-full h-full object-cover object-center opacity-90 transition-transform duration-[20s] ease-out hover:scale-105"
        />
        {/* Soft atmospheric shadows and depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050806] via-[#050806]/20 to-[#050806]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-[#050806]/40" />
        <div className="absolute inset-0 bg-[#050806]/10 backdrop-blur-[1px]" />
      </div>

      {/* 2. Left Content Area (Hidden on small screens) */}
      <div className="relative z-10 hidden lg:flex flex-col h-full justify-between py-16 max-w-2xl">
        
        {/* Top-Left Editorial Statement */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h3 className="font-serif text-2xl text-[#EDE8DC] leading-snug font-normal tracking-wide">
            Knowledge<br />Connects<br />Possibilities.
          </h3>
          <div className="h-px w-12 bg-[#8A948E]/30 my-5" />
          <p className="text-sm text-[#8A948E] font-serif font-light leading-relaxed">
            A smarter mind<br />for a brighter<br />tomorrow.
          </p>
        </div>

        {/* Bottom-Left Main Introduction & Feature Strip */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <h1 className="font-serif text-[3.5rem] font-normal text-[#F7F4EB] leading-[1.1] mb-6 drop-shadow-2xl">
            Start Your<br />
            <span className="italic font-light text-emerald-300">Knowledge Journey.</span>
          </h1>
          <p className="text-[#EDE8DC] text-lg font-light mb-1">
            Upload. Ask. Visualize. Build.
          </p>
          <p className="text-[#8A948E] text-base mb-12">
            Turn scattered information into connected knowledge.
          </p>

          {/* Feature Strip */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-400/80" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-[#F7F4EB] font-medium">Understand</p>
                <p className="text-xs text-[#8A948E]">Documents</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-emerald-400/80" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-[#F7F4EB] font-medium">Find</p>
                <p className="text-xs text-[#8A948E]">Connections</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-400/80" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-[#F7F4EB] font-medium">Visualize</p>
                <p className="text-xs text-[#8A948E]">Insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Blocks className="w-6 h-6 text-emerald-400/80" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-[#F7F4EB] font-medium">Build</p>
                <p className="text-xs text-[#8A948E]">Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Right Content - SignUp Panel */}
      <div className="relative z-10 w-full max-w-[440px] animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
        <div className="bg-[#0A0F0D]/75 backdrop-blur-xl border border-[#233129]/60 rounded-[2rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          {/* Subtle panel glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Branding */}
          <div className="flex items-center gap-3 mb-10 relative z-10">
            <CognivisLogo size={32} showText={false} />
            <div>
              <span className="block text-xl font-medium tracking-wide text-[#F7F4EB]">Cognivis</span>
              <span className="block text-[10px] tracking-[0.25em] text-[#8A948E] uppercase mt-0.5">Intelligence</span>
            </div>
          </div>

          <h2 className="font-serif text-3xl mb-2 text-[#F7F4EB] relative z-10">Create account</h2>
          <p className="text-[#8A948E] text-sm mb-8 font-light relative z-10">Build your personal knowledge workspace</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-rose-950/40 border border-rose-700/40 text-rose-300 text-xs relative z-10">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-medium text-[#8A948E] mb-1.5">Full name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7870] group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111714]/60 border border-[#233129] text-[#F7F4EB] text-sm placeholder-[#4A5450] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 focus:bg-[#111714]/90 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8A948E] mb-1.5">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7870] group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111714]/60 border border-[#233129] text-[#F7F4EB] text-sm placeholder-[#4A5450] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 focus:bg-[#111714]/90 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#8A948E] mb-1.5">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7870] group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    required
                    className="w-full pl-9 pr-9 py-3 rounded-xl bg-[#111714]/60 border border-[#233129] text-[#F7F4EB] text-sm placeholder-[#4A5450] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 focus:bg-[#111714]/90 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-[#8A948E] mb-1.5">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7870] group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat"
                    required
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#111714]/60 border border-[#233129] text-[#F7F4EB] text-sm placeholder-[#4A5450] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 focus:bg-[#111714]/90 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7870] hover:text-[#EDE8DC] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#EDE8DC] hover:bg-white text-[#0A0F0D] font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/10 mt-3"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0A0F0D]/30 border-t-[#0A0F0D] rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 relative z-10">
            <div className="flex-1 h-px bg-[#1C2520]" />
            <span className="text-[10px] text-[#4A5450] font-mono uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-[#1C2520]" />
          </div>

          {/* Secondary Actions */}
          <div className="space-y-3 relative z-10">
            <button
              onClick={handleGuest}
              className="w-full py-3 rounded-xl border border-[#233129]/80 hover:border-[#384D40] bg-[#111714]/40 hover:bg-[#111714]/80 text-[#D5D1C5] text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Telescope className="w-4 h-4 text-[#8A948E] group-hover:text-[#D5D1C5] transition-colors" />
              Continue as Guest
            </button>

            <button
              onClick={handleDemo}
              className="w-full py-3 rounded-xl border border-emerald-900/50 hover:border-emerald-500/50 bg-emerald-950/10 hover:bg-emerald-950/30 text-emerald-400 text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Explore Demo
            </button>
          </div>

          <p className="text-center text-xs text-[#6A7870] mt-8 relative z-10">
            Already have an account?{' '}
            <Link to="/signin" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* 4. Top-Right Brand Message */}
      <div className="absolute top-12 right-12 z-10 hidden lg:block text-right animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <p className="text-xs text-[#8A948E] font-serif font-light leading-relaxed">
          From Documents<br />To Deeper Understanding.
        </p>
        <div className="h-px w-8 bg-[#8A948E]/30 mt-3 ml-auto" />
      </div>

      {/* 5. Bottom-Right Micro Message */}
      <div className="absolute bottom-12 right-12 z-10 hidden lg:block text-right animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <p className="text-xs text-[#8A948E] font-serif italic opacity-70 hover:opacity-100 transition-opacity">
          Ideas live longer<br />when they are connected.
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
