import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { ApprovalNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type ApprovalNodeType = Node<ApprovalNodeData, 'approvalNode'>

export function ApprovalNode({ id, data, selected }: NodeProps<ApprovalNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[200px] rounded-xl bg-[#1a1d24] border-2
        transition-all duration-200 shadow-lg cursor-pointer
        ${selected ? 'border-amber-400 shadow-amber-400/20' : 'border-amber-500/30 hover:border-amber-400/60'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-amber-500 !border-2 !border-amber-300 !rounded-full"
      />

      <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-amber-400 to-yellow-500" />

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs">
            ✓
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/70">
            Approval
          </span>
        </div>

        <p className="text-sm font-medium text-gray-100 truncate">
          {data.title || 'Approval Required'}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
            {data.approverRole || 'Manager'}
          </span>
          {data.autoApproveThreshold > 0 && (
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">
              Auto ≤ {data.autoApproveThreshold}
            </span>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-amber-500 !border-2 !border-amber-300 !rounded-full"
      />
    </div>
  )
}
