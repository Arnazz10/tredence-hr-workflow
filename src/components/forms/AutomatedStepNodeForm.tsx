import { useState, useEffect } from 'react'
import type { AutomatedStepNodeData, AutomationAction } from '../../types'

interface Props {
  data: AutomatedStepNodeData
  onChange: (patch: Partial<AutomatedStepNodeData>) => void
}

export function AutomatedStepNodeForm({ data, onChange }: Props) {
  const [actions, setActions] = useState<AutomationAction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/automations')
      .then((res) => res.json() as Promise<AutomationAction[]>)
      .then((result) => {
        setActions(result)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectedAction = actions.find((a) => a.id === data.actionId)

  const handleActionChange = (actionId: string) => {
    const action = actions.find((a) => a.id === actionId)
    const params: Record<string, string> = {}
    action?.params.forEach((p) => {
      params[p] = ''
    })
    onChange({
      actionId,
      actionParams: params,
      label: action?.label || 'Automated Step',
    })
  }

  const handleParamChange = (param: string, value: string) => {
    onChange({
      actionParams: { ...data.actionParams, [param]: value },
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Node Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ title: e.target.value, label: e.target.value || 'Automated Step' })}
          placeholder="e.g. Notify Platform"
          className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium"
        />
      </div>

      <div>
        <label className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase block mb-2">
          Trigger Script
        </label>
        {loading ? (
          <div className="flex items-center gap-3 text-xs text-white/50 py-3 px-4 glass-input rounded-xl border-dashed">
            <div className="h-4 w-4 rounded-full border-2 border-purple-500/50 border-t-purple-400 animate-spin" />
            Loading registry...
          </div>
        ) : (
          <select
            value={data.actionId || ''}
            onChange={(e) => handleActionChange(e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-2.5 text-sm font-medium cursor-pointer [color-scheme:dark]"
          >
            <option value="">Select integration...</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div className="mt-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <label className="text-[10px] font-semibold tracking-widest text-purple-400/80 uppercase block mb-3">
            Execution Parameters
          </label>
          <div className="space-y-3 pl-3 border-l-2 border-purple-500/30">
            {selectedAction.params.map((param) => (
              <div key={param}>
                <label className="text-[10px] font-medium text-white/60 block mb-1.5 capitalize">
                  {param}
                </label>
                <input
                  type="text"
                  value={data.actionParams?.[param] || ''}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  placeholder={`Value for ${param}`}
                  className="glass-input w-full rounded-lg px-3 py-1.5 text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
