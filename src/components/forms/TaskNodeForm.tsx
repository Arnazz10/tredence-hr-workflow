import type { TaskNodeData } from '../../types'
import { KeyValueFields } from './KeyValueFields'

interface Props {
  data: TaskNodeData
  onChange: (patch: Partial<TaskNodeData>) => void
}

export function TaskNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Task Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ title: e.target.value, label: e.target.value || 'New Task' })}
          placeholder="e.g. Schedule Interview"
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium"
        />
      </div>

      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Description
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Brief task context..."
          rows={3}
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-semibold tracking-wider text-purple-300/80 uppercase block mb-1.5">
            Assignee
          </label>
          <input
            type="text"
            value={data.assignee || ''}
            onChange={(e) => onChange({ assignee: e.target.value })}
            placeholder="@user"
            className="glass-input w-full rounded-lg px-3 py-2 text-xs"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold tracking-wider text-purple-300/80 uppercase block mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={data.dueDate || ''}
            onChange={(e) => onChange({ dueDate: e.target.value })}
            className="glass-input w-full rounded-lg px-3 py-2 text-xs [color-scheme:dark]"
          />
        </div>
      </div>

      <KeyValueFields
        label="Context Variables"
        pairs={data.customFields || []}
        onChange={(customFields) => onChange({ customFields })}
      />
    </div>
  )
}
