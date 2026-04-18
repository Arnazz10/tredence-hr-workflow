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
        relative min-w-[220px] rounded-[24px] bg-[#0c0c0c] border
        transition-all duration-300 cursor-pointer
        ${selected ? 'border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/10 hover:border-blue-500/30'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-blue-500/40 !-top-[9.5px] z-10"
      />

      <div className="px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
               <line x1="16" y1="2" x2="16" y2="6"/>
               <line x1="8" y1="2" x2="8" y2="6"/>
               <line x1="3" y1="10" x2="21" y2="10"/>
             </svg>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Manual Task
          </span>
        </div>

        <p className="text-base font-medium text-white/90 mt-3 truncate">
          {data.title || 'Untitled Task'}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-blue-500/40 !-bottom-[9.5px] z-10"
      />
    </div>
  )
}
