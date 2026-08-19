export type SubBlock = { kind: 'h2'; text: string } | { kind: 'quote'; text: string } | { kind: 'p'; html: string }

// Body paragraphs are plain strings written by hand in src/data/blog.ts. A short
// first line with no closing punctuation reads as a section title (the original
// source used real headings there); a line wrapped in quotes reads as a pull quote.
// `**bold**` can be used inline anywhere to emphasise a phrase.
export function isHeadingLine(line: string) {
  if (line.length > 60) return false
  if (/[.!?,;]$/.test(line)) return false
  if (/^(https?:\/\/|fonte:)/i.test(line)) return false
  return true
}

export function isQuoteLine(line: string) {
  return /^["“].+["”]$/.test(line)
}

export function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function renderInline(text: string) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function splitParagraph(text: string): SubBlock[] {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  return lines.map((line, index) => {
    if (isQuoteLine(line)) return { kind: 'quote', text: line }
    if (index === 0 && isHeadingLine(line)) return { kind: 'h2', text: line }
    return { kind: 'p', html: renderInline(line) }
  })
}
