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
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Gate Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ title: e.target.value, label: e.target.value || 'Approval' })}
          placeholder="e.g. Budget Approval"
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium"
        />
      </div>

      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Required Role
        </label>
        <select
          value={data.approverRole || 'Manager'}
          onChange={(e) =>
            onChange({ approverRole: e.target.value as 'Manager' | 'HRBP' | 'Director' })
          }
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium cursor-pointer [color-scheme:dark]"
        >
          {APPROVER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role} Level
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Auto-Pass Threshold
        </label>
        <input
          type="number"
          min={0}
          value={data.autoApproveThreshold || 0}
          onChange={(e) => onChange({ autoApproveThreshold: Number(e.target.value) })}
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
        />
        <p className="text-[10px] text-white/40 mt-1.5 ml-1">
          Values ≤ this limit bypass approval
        </p>
      </div>
    </div>
  )
}
