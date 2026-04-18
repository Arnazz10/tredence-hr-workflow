import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { StartNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type StartNodeType = Node<StartNodeData, 'startNode'>

export function StartNode({ id, data, selected }: NodeProps<StartNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[180px] rounded-xl bg-[#1a1d24] border-2
        transition-all duration-200 shadow-lg cursor-pointer
        ${selected ? 'border-green-400 shadow-green-400/20' : 'border-green-500/30 hover:border-green-400/60'}
      `}
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-green-400 to-emerald-500" />

      <div className="px-4 py-3">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs">
            ▶
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400/70">
            Start
          </span>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-gray-100 truncate">
          {data.startTitle || 'Workflow Start'}
        </p>

        {/* Metadata count */}
        {data.metadata && data.metadata.length > 0 && (
          <p className="text-[10px] text-gray-500 mt-1">
            {data.metadata.length} metadata field{data.metadata.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300 !rounded-full"
      />
    </div>
  )
}
