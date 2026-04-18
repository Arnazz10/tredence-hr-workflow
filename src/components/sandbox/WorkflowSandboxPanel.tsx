import { createPortal } from 'react-dom'
import { useSimulate } from '../../hooks/useSimulate'
import type { SimulateStep } from '../../types'

function getStatusIcon(status: SimulateStep['status']): string {
  switch (status) {
    case 'completed':
      return '✓'
    case 'failed':
      return '✕'
    case 'skipped':
      return '⊘'
  }
}

function getNodeTypeStyles(nodeType: string) {
  switch (nodeType) {
    case 'startNode':
      return { text: 'text-white', glow: 'shadow-[0_0_10px_rgba(255,255,255,0.2)]' }
    case 'taskNode':
      return { text: 'text-white/80', glow: 'shadow-[0_0_10px_rgba(255,255,255,0.1)]' }
    case 'approvalNode':
      return { text: 'text-white', glow: 'shadow-[0_0_10px_rgba(255,255,255,0.2)]' }
    case 'automatedStepNode':
      return { text: 'text-white/80', glow: 'shadow-[0_0_10px_rgba(255,255,255,0.1)]' }
    case 'endNode':
      return { text: 'text-white/40', glow: 'shadow-[0_0_10px_rgba(255,255,255,0.05)]' }
    default:
      return { text: 'text-gray-400', glow: '' }
  }
}

export function WorkflowSandboxPanel() {
  const { steps, errors, isSimulating, showPanel, simulate, closePanel } =
    useSimulate()

  return (
    <>
      <button
        onClick={simulate}
        disabled={isSimulating}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-xl
                   bg-white/10 border border-white/20
                   text-white text-xs font-semibold uppercase tracking-wider
                   shadow-[0_0_15px_rgba(255,255,255,0.1)]
                   hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300"
      >
        {isSimulating ? (
          <>
            <div className="h-3.5 w-3.5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
            Simulating
          </>
        ) : (
          <>
            <span className="text-white/50">▶</span> Run Test
          </>
        )}
      </button>

      {showPanel && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-x-0 bottom-6 z-[100] flex justify-center pointer-events-none animate-slide-in-up">
          <div className="glass-panel w-[600px] max-h-[400px] rounded-2xl flex flex-col pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white">
                  Execution Trace
                </h3>
                <p className="text-[10px] text-white/40 mt-1">
                  {steps.length > 0
                    ? `Live: ${steps.length} steps executed`
                    : errors.length > 0
                      ? `${errors.length} validation error${errors.length > 1 ? 's' : ''}`
                      : 'Initializing simulation environment...'}
                </p>
              </div>
              <button
                onClick={closePanel}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all text-xs"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
              {errors.length > 0 && (
                <div className="space-y-3 mb-4">
                  {errors.map((err, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm bg-red-500/10 text-red-300 border border-red-500/20 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]"
                    >
                      <span className="mt-0.5 shrink-0 animate-pulse text-red-500">⚠</span>
                      <span className="text-xs font-medium tracking-wide">{err.message}</span>
                    </div>
                  ))}
                </div>
              )}

              {steps.length > 0 && (
                <div className="relative pl-2">
                  <div className="absolute left-[17px] top-[15px] bottom-[15px] w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                  <div className="space-y-6">
                    {steps.map((step, idx) => {
                      const styles = getNodeTypeStyles(step.nodeType)
                      return (
                        <div
                          key={step.nodeId}
                          className="relative flex items-center gap-5 animate-fade-in"
                          style={{ animationDelay: `${idx * 150}ms` }}
                        >
                          <div
                            className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0b0c15] border border-white/20 text-white text-[10px] ${styles.glow}`}
                          >
                            {getStatusIcon(step.status)}
                          </div>

                          <div className="flex-1 min-w-0 bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold tracking-wide text-white truncate">
                                {step.label}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span
                                className={`text-[9px] font-bold uppercase tracking-widest ${styles.text}`}
                              >
                                {step.nodeType.replace('Node', '')}
                              </span>
                              <span className="text-[10px] text-white/30 font-mono">
                                {step.nodeId.slice(0, 12)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {isSimulating && steps.length === 0 && errors.length === 0 && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-4 text-white/50">
                    <div className="h-6 w-6 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
                    <span className="text-xs font-medium tracking-widest uppercase">Connecting to runtime engine...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
