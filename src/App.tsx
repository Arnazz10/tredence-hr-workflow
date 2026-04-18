import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { PlansPage } from './pages/PlansPage'
import { WorkflowPage } from './pages/WorkflowPage'

export default function App() {
  const [view, setView] = useState<'landing' | 'app' | 'plans'>('landing')

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('app')} onNavPlans={() => setView('plans')} />
  }

  if (view === 'plans') {
    return <PlansPage onNavBack={() => setView('app')} />
  }

  return <WorkflowPage onNavHome={() => setView('landing')} onNavPlans={() => setView('plans')} />
}
