import type { StartNodeData } from '../../types'
import { KeyValueFields } from './KeyValueFields'

interface Props {
  data: StartNodeData
  onChange: (patch: Partial<StartNodeData>) => void
}

export function StartNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Start Title
        </label>
        <input
          type="text"
          value={data.startTitle || ''}
          onChange={(e) => onChange({ startTitle: e.target.value, label: e.target.value || 'Start' })}
          placeholder="e.g. Event Trigger"
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium"
        />
      </div>

      <KeyValueFields
        label="Metadata"
        pairs={data.metadata || []}
        onChange={(metadata) => onChange({ metadata })}
        keyPlaceholder="Field context"
        valuePlaceholder="Default inject"
      />
    </div>
  )
}
