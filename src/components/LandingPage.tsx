import { useState } from 'react'

interface LandingPageProps {
  onEnterApp: () => void
  onNavPlans: () => void
}

export function LandingPage({ onEnterApp, onNavPlans }: LandingPageProps) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-y-auto selection:bg-white/20">
      {/* Background ambient rendering */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        
        {/* Starfield / Dots background */}
        <div 
          className="absolute inset-0 opacity-40 animate-fade-in" 
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 40px 60px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 120px 20px, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 200px 150px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 280px 90px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 70px 250px, rgba(255,255,255,0.5), transparent)
            `,
            backgroundSize: '350px 350px'
          }} 
        />

        {/* Subtle top starlight dust */}
        <div className="absolute top-20 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
        
        {/* The massive glowing arch in the center */}
        <div className="absolute top-[35%] w-[120%] h-[800px] border-t border-white/10 rounded-[100%] max-w-[2000px] opacity-60" style={{
          boxShadow: 'inset 0 100px 100px -50px rgba(255, 255, 255, 0.05)'
        }} />
      </div>

      {/* Navigation Layer */}
      <nav className="relative z-20 flex items-center justify-between px-12 py-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="HRnest Logo" 
            className="w-14 h-14 mix-blend-screen opacity-90 transition-transform hover:scale-105"
          />
        </div>

        <button 
          onClick={onNavPlans}
          className="px-6 py-1.5 rounded-xl border-[2px] border-white bg-[#030303] text-white font-bold tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:text-black transition-all"
        >
          Plans
        </button>
      </nav>

      {/* Hero Content Layer */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-4 text-center">
        
        {/* Trust badge */}
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase mb-10 animate-fade-in shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9h8l-6.5 5 2.5 8-7-5-7 5 2.5-8L1 9h8z"/>
          </svg>
          Trusted By HR Leaders Worldwide
        </div>

        {/* Hero Title */}
        <h1 className="text-[64px] md:text-[88px] font-semibold tracking-tight text-white max-w-5xl leading-[1.05] mb-8 animate-slide-in-up">
          All your workflows, Unified<br />
          in One <span className="italic font-light text-white/90">Intelligent Nest.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm md:text-base text-white/40 leading-relaxed font-light mb-12 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
          Orchestrate onboarding, approvals, and data with precision. HRnest is your modular command center for everything workflow — designed for absolute clarity, speed, and uncompromising control.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <button 
            onClick={onEnterApp}
            className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Start Free
          </button>
          <button 
            onClick={() => setShowVideo(true)}
            className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
          >
            Watch Demo
          </button>
        </div>
      </main>

      {/* Secondary Features Fragment */}
      <section className="relative z-10 py-32 px-4 text-center mt-12 bg-gradient-to-b from-transparent to-black">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-20">
          Fragmented Processes Return<br/> Diminishing Velocity.
        </h2>

        {/* Floating Pills Representation */}
        <div className="relative max-w-4xl mx-auto h-[400px]">
          {/* Pill 1 */}
          <div className="absolute top-10 left-[15%] px-5 py-3 rounded-full bg-[#111] border border-white/10 text-xs text-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transform -rotate-[5deg] animate-pulse" style={{ animationDuration: '4s' }}>
            <span className="opacity-50 mr-2">▤</span> Tasks live in separate emails.
          </div>
          
          {/* Pill 2 */}
          <div className="absolute top-32 right-[10%] px-5 py-3 rounded-full bg-[#111] border border-white/10 text-xs text-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transform rotate-[3deg] animate-pulse" style={{ animationDuration: '5s' }}>
            <span className="opacity-50 mr-2">✓</span> Approvals block progress.
          </div>

          {/* Pill 3 */}
          <div className="absolute bottom-20 left-[30%] px-5 py-3 rounded-full bg-[#111] border border-white/10 text-xs text-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transform rotate-[1deg] animate-pulse" style={{ animationDuration: '6s' }}>
            <span className="opacity-50 mr-2">⚡</span> Tools hide in disconnected dashboards.
          </div>

          {/* Abstract stars/dots acting as nodes */}
          <div className="absolute top-5 left-10 w-2 h-2 rounded-full bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          <div className="absolute top-40 left-1/4 w-3 h-3 rounded-full bg-white/10" />
          <div className="absolute bottom-10 right-1/4 w-2 h-2 rounded-full bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-white/10 border border-white/20" />
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/50 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md border border-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <iframe 
              src="https://drive.google.com/file/d/1b-8rwoCYGsjdxai1Ru4IhvwZz3Fe5iQb/preview" 
              className="w-full h-full border-0"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
