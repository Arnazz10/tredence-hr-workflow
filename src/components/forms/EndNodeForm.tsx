import type { EndNodeData } from '../../types'

interface Props {
  data: EndNodeData
  onChange: (patch: Partial<EndNodeData>) => void
}

export function EndNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Termination Message
        </label>
        <input
          type="text"
          value={data.endMessage || ''}
          onChange={(e) => onChange({ endMessage: e.target.value, label: e.target.value || 'End' })}
          placeholder="e.g. Workflow Successfully Completed"
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium"
        />
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <label className="text-xs font-semibold text-gray-200 block">
            Generate Execution Summary
          </label>
          <p className="text-[10px] text-white/40 mt-1">
            Emit log file upon workflow completion
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange({ summaryFlag: !data.summaryFlag })}
          className={`
            relative inline-flex h-6 w-11 rounded-full transition-colors duration-300
            ${data.summaryFlag ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/10'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 mt-1 rounded-full bg-white shadow-md transform transition-transform duration-300
              ${data.summaryFlag ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    </div>
  )
}
