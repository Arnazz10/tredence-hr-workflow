import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { EndNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type EndNodeType = Node<EndNodeData, 'endNode'>

export function EndNode({ id, data, selected }: NodeProps<EndNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[180px] rounded-xl bg-[#1a1d24] border-2
        transition-all duration-200 shadow-lg cursor-pointer
        ${selected ? 'border-red-400 shadow-red-400/20' : 'border-red-500/30 hover:border-red-400/60'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-red-300 !rounded-full"
      />

      <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-red-400 to-rose-500" />

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs">
            ■
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400/70">
            End
          </span>
        </div>

        <p className="text-sm font-medium text-gray-100 truncate">
          {data.endMessage || 'Workflow Complete'}
        </p>

        {data.summaryFlag && (
          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
            <span>📋</span> Summary enabled
          </p>
        )}
      </div>
    </div>
  )
}
