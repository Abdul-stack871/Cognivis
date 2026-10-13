import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Files,
  TrendingUp,
  Brain,
} from 'lucide-react';
import { CognivisLogo } from '../../components/common/CognivisLogo';
import { Button } from '../../components/ui/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E0C] text-[#F7F4EB] font-sans antialiased relative overflow-hidden flex flex-col justify-between">
      {/* Background Scenic Image with Circular Stone Portal */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/observatory-hero.jpg"
          alt="Observatory Scenic Portal"
          className="w-full h-full object-cover object-right lg:object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E0C] via-[#0A0E0C]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0C] via-transparent to-[#0A0E0C]/60" />
      </div>

      {/* Top Navbar matching Reference Screen 1 */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <CognivisLogo size={32} />

          <nav className="hidden md:flex items-center gap-6 text-xs text-[#8A948E] font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="text-xs font-medium text-[#D5D1C5] hover:text-white transition-colors"
          >
            Sign in
          </button>
          <Button
            onClick={() => navigate('/home')}
            variant="primary"
            size="sm"
            className="bg-[#EDE8DC] hover:bg-[#DDD7C8] text-[#141C18] font-semibold rounded-xl px-5 border-none shadow-md"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section matching Reference Screen 1 */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12 lg:py-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A3ABA6] block">
              TURN DOCUMENTS TO DEEPER UNDERSTANDING
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#F7F4EB] leading-[1.05] tracking-tight">
              Your Knowledge <br />
              Deserves a Bigger <br />
              <span className="italic font-light text-emerald-200">Picture.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#8A948E] max-w-lg leading-relaxed font-sans">
              Upload, Ask, Visualize, Build. <br />
              Turn scattered information into connected knowledge.
            </p>

            {/* CTAs matching Reference Screen 1 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                onClick={() => navigate('/home')}
                variant="primary"
                size="lg"
                className="bg-[#EDE8DC] hover:bg-[#DDD7C8] text-[#141C18] font-semibold rounded-2xl px-6 py-3 border-none shadow-xl"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <button
                onClick={() => navigate('/documents/doc-1')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#2A3B33] hover:border-emerald-500/50 bg-[#111714]/80 text-xs font-medium text-[#EDE8DC] hover:text-white transition-all shadow-md"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quote Card on Warm Parchment matching Reference Screen 1 */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="rounded-3xl p-7 bg-[#EDE8DC] text-[#141C18] border border-[#D5CFBF] shadow-2xl max-w-sm space-y-4">
              <p className="font-serif text-xl italic font-normal text-[#1A231F] leading-snug">
                "The right information at the right time changes everything."
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-[#5E6862] pt-3 border-t border-[#D0C9B8]">
                <span className="font-bold text-[#141C18]">Cognivis Observatory</span>
                <span>Est. 2026</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Quantitative Stats matching Reference Screen 1 */}
      <footer className="relative z-10 border-t border-[#1C2520] bg-[#0A0E0C]/90 backdrop-blur-md py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-2xl font-bold text-[#F7F4EB]">10K+</span>
            <span className="text-xs text-[#8A948E]">Documents Analyzed</span>
          </div>

          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-2xl font-bold text-emerald-400">98%</span>
            <span className="text-xs text-[#8A948E]">Accurate Answers</span>
          </div>

          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-2xl font-bold text-blue-400">5x</span>
            <span className="text-xs text-[#8A948E]">Faster Understanding</span>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
          >
            <span>Launch Observatory</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </footer>
    </div>
  );
};
