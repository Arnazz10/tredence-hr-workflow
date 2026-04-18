import type { NodeType } from '../../types'

interface SidebarNodeCard {
  type: NodeType
  label: string
  icon: string
  glowClass: string
  description: string
}

const nodeCards: SidebarNodeCard[] = [
  {
    type: 'startNode',
    label: 'Start Trigger',
    icon: '▶',
    glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white border-white/20',
    description: 'Event-based entry point',
  },
  {
    type: 'taskNode',
    label: 'Manual Task',
    icon: '▤',
    glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white border-white/20',
    description: 'Assign work to a team member',
  },
  {
    type: 'approvalNode',
    label: 'Approval Gate',
    icon: '✓',
    glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white border-white/20',
    description: 'Require explicit sign-off',
  },
  {
    type: 'automatedStepNode',
    label: 'Automation',
    icon: '⚡',
    glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white border-white/20',
    description: 'Run background action',
  },
  {
    type: 'endNode',
    label: 'End Process',
    icon: '■',
    glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white/50 border-white/10',
    description: 'Terminate workflow path',
  },
]

export function DraggableSidebar() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="glass-panel absolute top-[100px] left-6 bottom-6 w-[280px] z-10 flex flex-col rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
        <h2 className="text-sm font-semibold text-white tracking-widest uppercase">
          Nodes
        </h2>
        <p className="text-[11px] text-white/50 mt-1">
          Drag elements to canvas
        </p>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {nodeCards.map((card) => (
          <div
            key={card.type}
            draggable
            onDragStart={(e) => onDragStart(e, card.type)}
            className="group relative flex items-center gap-4 rounded-xl bg-black/20 border border-white/5
                       px-4 py-4 cursor-grab active:cursor-grabbing
                       transition-all duration-300
                       hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
          >
            {/* Icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#050511] border transition-colors ${card.glowClass}`}
            >
              {card.icon}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-wide text-gray-200 group-hover:text-white transition-colors">
                {card.label}
              </p>
              <p className="text-[10px] text-gray-500 mt-1 truncate">
                {card.description}
              </p>
            </div>

            {/* Drag Handle */}
            <div className="absolute right-4 opacity-0 group-hover:opacity-50 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <circle cx="4" cy="3" r="1.5" />
                <circle cx="4" cy="7" r="1.5" />
                <circle cx="4" cy="11" r="1.5" />
                <circle cx="10" cy="3" r="1.5" />
                <circle cx="10" cy="7" r="1.5" />
                <circle cx="10" cy="11" r="1.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
