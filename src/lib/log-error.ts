export function extractDbError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const last = lines[lines.length - 1] || raw;
  const short = last.replace(/^Error querying the database:\s*/i, '');
  return short.length > 120 ? short.slice(0, 120) : short;
}
