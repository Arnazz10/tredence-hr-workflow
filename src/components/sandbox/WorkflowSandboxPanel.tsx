import { useSimulate } from '../../hooks/useSimulate'
import type { SimulateStep } from '../../types'

function getStatusColor(status: SimulateStep['status']): string {
  switch (status) {
    case 'completed':
      return 'bg-green-500'
    case 'failed':
      return 'bg-red-500'
    case 'skipped':
      return 'bg-gray-500'
  }
}

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

function getNodeTypeColor(nodeType: string): string {
  switch (nodeType) {
    case 'startNode':
      return 'text-green-400'
    case 'taskNode':
      return 'text-blue-400'
    case 'approvalNode':
      return 'text-amber-400'
    case 'automatedStepNode':
      return 'text-purple-400'
    case 'endNode':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

export function WorkflowSandboxPanel() {
  const { steps, errors, isSimulating, showPanel, simulate, closePanel } =
    useSimulate()

  return (
    <>
      {/* Trigger button in toolbar */}
      <button
        onClick={simulate}
        disabled={isSimulating}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   text-white text-sm font-medium shadow-lg shadow-indigo-500/20
                   hover:from-indigo-500 hover:to-purple-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        {isSimulating ? (
          <>
            <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Simulating...
          </>
        ) : (
          <>
            <span>▶</span>
            Test Workflow
          </>
        )}
      </button>

      {/* Bottom panel overlay */}
      {showPanel && (
        <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-in-up">
          <div className="mx-4 mb-4 max-h-[400px] rounded-2xl bg-[#12141a] border border-gray-800/50 shadow-2xl shadow-black/50 overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
              <div>
                <h3 className="text-sm font-semibold text-gray-200">
                  Workflow Simulation
                </h3>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  {steps.length > 0
                    ? `${steps.length} steps executed`
                    : errors.length > 0
                      ? `${errors.length} validation error${errors.length > 1 ? 's' : ''}`
                      : 'Running simulation...'}
                </p>
              </div>
              <button
                onClick={closePanel}
                className="text-gray-500 hover:text-gray-300 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[300px] px-6 py-4">
              {/* Validation errors */}
              {errors.length > 0 && (
                <div className="space-y-2 mb-4">
                  {errors.map((err, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 rounded-lg px-4 py-3 text-sm ${
                        err.type === 'error'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      <span className="mt-0.5 shrink-0">
                        {err.type === 'error' ? '⚠' : '⚡'}
                      </span>
                      <span className="text-xs">{err.message}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Simulation timeline */}
              {steps.length > 0 && (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-800" />

                  <div className="space-y-0">
                    {steps.map((step, idx) => (
                      <div
                        key={step.nodeId}
                        className="relative flex items-center gap-4 py-3 animate-fade-in"
                        style={{ animationDelay: `${idx * 150}ms` }}
                      >
                        {/* Status dot */}
                        <div
                          className={`relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full
                                     ${getStatusColor(step.status)} text-white text-xs font-bold shadow-lg`}
                        >
                          {getStatusIcon(step.status)}
                        </div>

                        {/* Step info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-200 truncate">
                              {step.label}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`text-[10px] font-medium ${getNodeTypeColor(step.nodeType)}`}
                            >
                              {step.nodeType.replace('Node', '')}
                            </span>
                            <span className="text-[10px] text-gray-600">
                              ID: {step.nodeId.slice(0, 12)}…
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <span
                          className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium
                                     ${
                                       step.status === 'completed'
                                         ? 'bg-green-500/10 text-green-400'
                                         : step.status === 'failed'
                                           ? 'bg-red-500/10 text-red-400'
                                           : 'bg-gray-500/10 text-gray-400'
                                     }`}
                        >
                          {step.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading state */}
              {isSimulating && steps.length === 0 && errors.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="h-5 w-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                    <span className="text-sm">Running simulation...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
