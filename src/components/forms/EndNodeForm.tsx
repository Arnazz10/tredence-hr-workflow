import type { EndNodeData } from '../../types'

interface Props {
  data: EndNodeData
  onChange: (patch: Partial<EndNodeData>) => void
}

export function EndNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          End Message
        </label>
        <input
          type="text"
          value={data.endMessage || ''}
          onChange={(e) => onChange({ endMessage: e.target.value, label: e.target.value || 'End' })}
          placeholder="e.g. Onboarding Complete"
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-red-500/50 transition-colors"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-medium text-gray-400 block">
            Generate Summary
          </label>
          <p className="text-[10px] text-gray-600 mt-0.5">
            Include a workflow execution summary
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange({ summaryFlag: !data.summaryFlag })}
          className={`
            relative inline-flex h-6 w-11 rounded-full transition-colors duration-200
            ${data.summaryFlag ? 'bg-red-500' : 'bg-gray-700'}
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200
              ${data.summaryFlag ? 'translate-x-5.5' : 'translate-x-0.5'}
              mt-0.5
            `}
          />
        </button>
      </div>
    </div>
  )
}
