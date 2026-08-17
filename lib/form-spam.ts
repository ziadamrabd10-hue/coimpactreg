const MIN_SUBMIT_MS = 3000

export interface AntiSpamPayload {
  website?: string
  formLoadedAt?: number
}

function vowelRatio(text: string): number {
  const vowels = (text.match(/[aeiouAEIOUäöüÄÖÜ]/g) || []).length
  return vowels / Math.max(text.length, 1)
}

function caseChangeCount(text: string): number {
  let changes = 0
  for (let i = 1; i < text.length; i++) {
    const prev = text[i - 1]
    const curr = text[i]
    if (/[a-zA-Z]/.test(prev) && /[a-zA-Z]/.test(curr)) {
      const prevUpper = prev === prev.toUpperCase()
      const currUpper = curr === curr.toUpperCase()
      if (prevUpper !== currUpper) changes++
    }
  }
  return changes
}

/** Detects random bot strings like aTpiuBmdpNjLqLQJNSgK */
export function looksLikeSpamText(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return false

  if (trimmed.length > 10 && vowelRatio(trimmed) < 0.12) {
    return true
  }

  if (
    trimmed.length > 12 &&
    !trimmed.includes(' ') &&
    /^[a-zA-Z0-9._-]+$/.test(trimmed) &&
    /[A-Z]/.test(trimmed) &&
    /[a-z]/.test(trimmed) &&
    caseChangeCount(trimmed) >= 4
  ) {
    return true
  }

  return false
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function passesAntiSpamGate(data: AntiSpamPayload): boolean {
  if (data.website?.trim()) return false
  const elapsed = Date.now() - Number(data.formLoadedAt || 0)
  if (!data.formLoadedAt || elapsed < MIN_SUBMIT_MS) return false
  return true
}

export function validateAnalysisRequest(data: Record<string, unknown>): boolean {
  if (!passesAntiSpamGate(data as AntiSpamPayload)) return false

  const title = String(data.title || '').trim()
  const leadName = String(data.analysisLeadName || '').trim()
  const objective = String(data.primaryObjective || '').trim()
  const email = String(data.contactEmail || '').trim()
  const subProjects = data.subProjects as string[] | undefined

  if (!title || !leadName || !objective || !email || !isValidEmail(email)) return false
  if (!subProjects || subProjects.length === 0) return false
  if (data.sabSupport !== 'yes' && data.sabSupport !== 'no') return false
  if (objective.length < 15 || !objective.includes(' ')) return false

  const fieldsToCheck = [title, leadName, objective, String(data.analysisLeadInstitution || '')]
  if (fieldsToCheck.some((f) => f && looksLikeSpamText(f))) return false

  return true
}

export function validateContactSubmission(data: Record<string, unknown>): boolean {
  if (!passesAntiSpamGate(data as AntiSpamPayload)) return false

  const name = String(data.name || '').trim()
  const email = String(data.email || '').trim()
  const message = String(data.message || '').trim()

  if (!name || !email || !message || !isValidEmail(email)) return false
  if (message.length < 10) return false

  if (looksLikeSpamText(name) || looksLikeSpamText(message)) return false

  const institution = String(data.institution || '').trim()
  if (institution && looksLikeSpamText(institution)) return false

  return true
}

export function validateRegistrySubmission(data: Record<string, unknown>): boolean {
  if (!passesAntiSpamGate(data as AntiSpamPayload)) return false

  const formData = data.formData as Record<string, unknown> | undefined
  if (!formData) return false

  const centerName = String(formData.centerName || '').trim()
  if (!centerName || looksLikeSpamText(centerName)) return false

  const contacts = formData.contacts as { name?: string; email?: string }[] | undefined
  if (!contacts?.length || !contacts[0]?.email || !isValidEmail(contacts[0].email)) return false
  if (contacts.some((c) => c.name && looksLikeSpamText(c.name))) return false

  return true
}
