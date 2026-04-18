import type { KeyValuePair } from '../../types'

interface KeyValueFieldsProps {
  label: string
  pairs: KeyValuePair[]
  onChange: (pairs: KeyValuePair[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
}

export function KeyValueFields({
  label,
  pairs,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
}: KeyValueFieldsProps) {
  const addPair = () => {
    onChange([...pairs, { key: '', value: '' }])
  }

  const removePair = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index))
  }

  const updatePair = (index: number, field: 'key' | 'value', val: string) => {
    const updated = pairs.map((pair, i) =>
      i === index ? { ...pair, [field]: val } : pair
    )
    onChange(updated)
  }

  return (
    <div className="mt-6 pt-4 border-t border-white/5">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] font-semibold tracking-wider text-white/50 uppercase">
          {label}
        </label>
        <button
          type="button"
          onClick={addPair}
          className="text-[10px] px-2.5 py-1 rounded-lg border border-white/20 bg-white/5 text-white/80 hover:bg-white hover:text-black hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all font-medium"
        >
          + ADD ROW
        </button>
      </div>

      {pairs.length === 0 && (
        <p className="text-[11px] text-white/30 italic">No entries configured</p>
      )}

      <div className="space-y-2">
        {pairs.map((pair, idx) => (
          <div key={idx} className="flex gap-2 items-center group">
            <input
              type="text"
              value={pair.key}
              onChange={(e) => updatePair(idx, 'key', e.target.value)}
              placeholder={keyPlaceholder}
              className="glass-input flex-1 rounded-lg px-3 py-1.5 text-[11px]"
            />
            <input
              type="text"
              value={pair.value}
              onChange={(e) => updatePair(idx, 'value', e.target.value)}
              placeholder={valuePlaceholder}
              className="glass-input flex-1 rounded-lg px-3 py-1.5 text-[11px]"
            />
            <button
              type="button"
              onClick={() => removePair(idx)}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/10 text-white/50 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all text-[10px]"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
