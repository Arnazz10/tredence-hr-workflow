import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { TaskNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type TaskNodeType = Node<TaskNodeData, 'taskNode'>

export function TaskNode({ id, data, selected }: NodeProps<TaskNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[200px] rounded-xl bg-[#1a1d24] border-2
        transition-all duration-200 shadow-lg cursor-pointer
        ${selected ? 'border-blue-400 shadow-blue-400/20' : 'border-blue-500/30 hover:border-blue-400/60'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-blue-300 !rounded-full"
      />

      <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-blue-400 to-cyan-500" />

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs">
            ✎
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400/70">
            Task
          </span>
        </div>

        <p className="text-sm font-medium text-gray-100 truncate">
          {data.title || 'Untitled Task'}
        </p>

        {data.assignee && (
          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
            <span>👤</span> {data.assignee}
          </p>
        )}

        {data.dueDate && (
          <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
            <span>📅</span> {data.dueDate}
          </p>
        )}

        {/* Stats row */}
        <div className="flex gap-2 mt-2">
          {data.customFields && data.customFields.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">
              ⚙ {data.customFields.length} fields
            </span>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-blue-300 !rounded-full"
      />
    </div>
  )
}
