export async function logEvent(level, message) {
  const logsUrl = process.env.LOGS_URL || 'http://localhost:4005';
  try {
    await fetch(`${logsUrl}/monitoring/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, engine: 'validation' })
    });
  } catch {}
}
