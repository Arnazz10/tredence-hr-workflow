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
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ title: e.target.value, label: e.target.value || 'New Task' })}
          placeholder="e.g. Collect Documents"
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Description
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe the task..."
          rows={3}
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600 resize-none
                     focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Assignee
        </label>
        <input
          type="text"
          value={data.assignee || ''}
          onChange={(e) => onChange({ assignee: e.target.value })}
          placeholder="e.g. John Doe"
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Due Date
        </label>
        <input
          type="date"
          value={data.dueDate || ''}
          onChange={(e) => onChange({ dueDate: e.target.value })}
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-blue-500/50 transition-colors
                     [color-scheme:dark]"
        />
      </div>

      <KeyValueFields
        label="Custom Fields"
        pairs={data.customFields || []}
        onChange={(customFields) => onChange({ customFields })}
      />
    </div>
  )
}
