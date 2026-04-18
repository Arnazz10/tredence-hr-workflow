
interface PlansPageProps {
  onNavBack: () => void
}

export function PlansPage({ onNavBack }: PlansPageProps) {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-y-auto">
      {/* Background ambient rendering */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 flex items-center px-12 py-8 max-w-[1400px] mx-auto">
        <button 
          onClick={onNavBack}
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all outline-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="text-sm font-semibold tracking-wide">Back to Dashboard</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-32">
        <div className="text-center mb-20 animate-slide-in-up">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Scale your HR Workflows.
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            Start free, then unlock limitless automation power and enterprise-grade security as your organization scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          
          {/* FREE TIER */}
          <div className="relative flex flex-col p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
            <p className="text-sm text-white/40 mb-6">Perfect for small teams exploring automation.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-white/30 text-sm ml-2">/mo</span>
            </div>
            <button className="w-full py-3 rounded-full border border-white/10 text-white/50 font-medium cursor-default">
              Current Plan
            </button>
            <div className="mt-10 flex flex-col gap-4">
              <Feature text="Up to 3 active workflows" />
              <Feature text="100 automated executions /mo" />
              <Feature text="Standard integrations" />
              <Feature text="Community support" />
            </div>
          </div>

          {/* PRO TIER */}
          <div className="relative flex flex-col p-8 rounded-3xl bg-[#0d0d0d] border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.05)] transform md:-translate-y-4 hover:-translate-y-6 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
            <p className="text-sm text-white/40 mb-6">For growing organizations needing deep automation.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-white/30 text-sm ml-2">/mo per admin</span>
            </div>
            <button className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
              Upgrade to Pro
            </button>
            <div className="mt-10 flex flex-col gap-4">
              <Feature text="Unlimited active workflows" />
              <Feature text="5,000 automated executions /mo" />
              <Feature text="Premium HRIS integrations" />
              <Feature text="Custom AI Nodes" />
              <Feature text="Priority email support" />
            </div>
          </div>

          {/* PLUS TIER */}
          <div className="relative flex flex-col p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
            <p className="text-sm text-white/40 mb-6">Absolute control, compliance, and limitless scalability.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$199</span>
              <span className="text-white/30 text-sm ml-2">/mo minimum</span>
            </div>
            <button className="w-full py-3 rounded-full bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 transition-all">
              Contact Sales
            </button>
            <div className="mt-10 flex flex-col gap-4">
              <Feature text="Unlimited automated executions" />
              <Feature text="SAML Single Sign-On (SSO)" />
              <Feature text="On-prem runner support" />
              <Feature text="Advanced audit logs & compliance" />
              <Feature text="Dedicated Account Manager" />
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-sm text-white/70 font-medium">{text}</span>
    </div>
  )
}
