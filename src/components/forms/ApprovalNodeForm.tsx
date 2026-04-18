import type { ApprovalNodeData } from '../../types'

interface Props {
  data: ApprovalNodeData
  onChange: (patch: Partial<ApprovalNodeData>) => void
}

const APPROVER_ROLES = ['Manager', 'HRBP', 'Director'] as const

export function ApprovalNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ title: e.target.value, label: e.target.value || 'Approval' })}
          placeholder="e.g. Manager Approval"
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-amber-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Approver Role
        </label>
        <select
          value={data.approverRole || 'Manager'}
          onChange={(e) =>
            onChange({ approverRole: e.target.value as 'Manager' | 'HRBP' | 'Director' })
          }
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200
                     focus:outline-none focus:border-amber-500/50 transition-colors
                     [color-scheme:dark]"
        >
          {APPROVER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Auto-Approve Threshold
        </label>
        <input
          type="number"
          min={0}
          value={data.autoApproveThreshold || 0}
          onChange={(e) => onChange({ autoApproveThreshold: Number(e.target.value) })}
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-amber-500/50 transition-colors
                     [color-scheme:dark]"
        />
        <p className="text-[10px] text-gray-600 mt-1">
          Requests at or below this value are auto-approved
        </p>
      </div>
    </div>
  )
}
