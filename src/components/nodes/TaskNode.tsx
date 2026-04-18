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
        ${selected ? 'border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'border-white/20 hover:border-white/30'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-white/40 !-top-[9.5px] z-10"
      />

      <div className="px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
                <line x1="8" y1="8" x2="16" y2="8"/>
                <line x1="8" y1="16" x2="16" y2="16"/>
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
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-white/40 !-bottom-[9.5px] z-10"
      />
    </div>
  )
}
