export async function logEvent(level, message) {
  const logsUrl = process.env.LOGS_URL || 'http://localhost:4005';
  try {
    await fetch(`${logsUrl}/monitoring/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, engine: 'gateway' })
    });
  } catch {}
}

export async function runBlueprint(project, blueprint) {
  const validationUrl = process.env.VALIDATION_URL || 'http://localhost:4004';
  const executionUrl = process.env.EXECUTION_URL || 'http://localhost:4002';

  const valRes = await fetch(`${validationUrl}/validation/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blueprint })
  });
  const valData = await valRes.json();
  if (!valData.valid) {
    throw new Error('validation failed');
  }

  const results = [];
  for (const action of blueprint.actions) {
    try {
      const res = await fetch(`${executionUrl}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action.type, project, params: action.params })
      });
      const data = await res.json().catch(() => undefined);
      if (!res.ok) throw new Error(data?.error || res.statusText);
      results.push({ status: 'success', data });
    } catch (err) {
      results.push({ status: 'error', error: err.message });
    }
  }

  return { results };
}
