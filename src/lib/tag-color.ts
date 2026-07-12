export const tagPalette = [
  { bg: 'rgba(194,58,43,0.1)', color: 'rgba(194,58,43,1)' },
  { bg: 'rgba(212,168,67,0.1)', color: 'rgba(184,134,11,1)' },
  { bg: 'rgba(74,140,109,0.1)', color: 'rgba(74,140,109,1)' },
  { bg: 'rgba(91,127,168,0.1)', color: 'rgba(91,127,168,1)' },
  { bg: 'rgba(160,139,106,0.1)', color: 'rgba(160,139,106,1)' },
  { bg: 'rgba(123,158,179,0.1)', color: 'rgba(123,158,179,1)' },
]

export function tagColor(tag: string) {
  let hash = 0
  for (let i = 0; i < tag.length; i++) hash = ((hash << 5) - hash) + tag.charCodeAt(i)
  return tagPalette[Math.abs(hash) % tagPalette.length]
}
