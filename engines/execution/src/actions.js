export async function logEvent(level, message) {
  const logsUrl = process.env.LOGS_URL || 'http://localhost:4005';
  try {
    await fetch(`${logsUrl}/monitoring/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, engine: 'execution' })
    });
  } catch {}
}

export async function logMessage(params) {
  console.log(params?.message);
  await logEvent('info', params?.message || '');
  return { status: 'success' };
}

export async function sendSlack(project, params) {
  if (!project) {
    throw new Error('project required');
  }
  if (!params?.channel || !params?.message) {
    throw new Error('channel and message required');
  }
  const vaultUrl = process.env.VAULT_URL || 'http://localhost:4003';
  const tokenResp = await fetch(`${vaultUrl}/vault/token/${project}/slack`);
  if (tokenResp.status === 404) {
    return { status: 'error', message: 'Slack token not found' };
  }
  if (!tokenResp.ok) {
    throw new Error(`Vault error: ${tokenResp.status}`);
  }
  const { token } = await tokenResp.json();
  const slackResp = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ channel: params.channel, text: params.message })
  });
  const slackJson = await slackResp.json();
  if (!slackJson.ok) {
    await logEvent('error', `send_slack failed: ${slackJson.error}`);
    return { status: 'error', message: slackJson.error };
  }
  await logEvent('info', 'send_slack success');
  return { status: 'success', data: { ts: slackJson.ts } };
}

export async function httpRequest(project, params) {
  if (!params.url) {
    throw new Error('url required');
  }
  const method = (params.method || 'GET').toUpperCase();
  const headers = { ...(params.headers || {}) };

  if (params.service && project) {
    const vaultUrl = process.env.VAULT_URL || 'http://localhost:4003';
    const tokenResp = await fetch(`${vaultUrl}/vault/token/${project}/${params.service}`);
    if (tokenResp.status === 404) {
      return { status: 'error', message: `${params.service} token not found` };
    }
    if (!tokenResp.ok) {
      throw new Error(`Vault error: ${tokenResp.status}`);
    }
    const { token } = await tokenResp.json();
    headers['Authorization'] = `Bearer ${token}`;
  }

  const resp = await fetch(params.url, {
    method,
    headers,
    body: params.body ? JSON.stringify(params.body) : undefined
  });

  const data = await resp.json().catch(() => undefined);
  if (!resp.ok) {
    await logEvent('error', `http_request failed: ${data?.error || resp.statusText}`);
    return { status: 'error', message: data?.error || resp.statusText };
  }
  await logEvent('info', 'http_request success');
  return { status: 'success', data };
}

export async function createSheet(project, params) {
  if (!project) {
    throw new Error('project required');
  }
  if (!params.sheetId || !Array.isArray(params.row)) {
    throw new Error('sheetId and row required');
  }

  const vaultUrl = process.env.VAULT_URL || 'http://localhost:4003';
  const tokenResp = await fetch(`${vaultUrl}/vault/token/${project}/google_sheets`);
  if (tokenResp.status === 404) {
    return { status: 'error', message: 'google_sheets token not found' };
  }
  if (!tokenResp.ok) {
    throw new Error(`Vault error: ${tokenResp.status}`);
  }
  const { token } = await tokenResp.json();

  const apiResp = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${params.sheetId}/values/A1:append?valueInputOption=RAW`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [params.row] })
  });
  const apiJson = await apiResp.json().catch(() => undefined);
  if (!apiResp.ok) {
    await logEvent('error', `create_sheet failed: ${apiJson?.error?.message || apiResp.statusText}`);
    return { status: 'error', message: apiJson?.error?.message || apiResp.statusText };
  }
  await logEvent('info', 'create_sheet success');
  return { status: 'success', data: apiJson };
}
