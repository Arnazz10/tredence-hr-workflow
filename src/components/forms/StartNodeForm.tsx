import type { StartNodeData } from '../../types'
import { KeyValueFields } from './KeyValueFields'

interface Props {
  data: StartNodeData
  onChange: (patch: Partial<StartNodeData>) => void
}

export function StartNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Start Title
        </label>
        <input
          type="text"
          value={data.startTitle || ''}
          onChange={(e) => onChange({ startTitle: e.target.value, label: e.target.value || 'Start' })}
          placeholder="e.g. Employee Onboarding"
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-green-500/50 transition-colors"
        />
      </div>

      <KeyValueFields
        label="Metadata"
        pairs={data.metadata || []}
        onChange={(metadata) => onChange({ metadata })}
        keyPlaceholder="Field name"
        valuePlaceholder="Default value"
      />
    </div>
  )
}
