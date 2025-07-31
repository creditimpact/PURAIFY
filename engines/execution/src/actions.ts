export async function logMessage(params: { message?: string }) {
  console.log(params?.message);
  return { status: 'success' };
}

export async function sendSlack(project: string, params: { channel?: string; message?: string }) {
  if (!project) {
    throw new Error('project required');
  }
  if (!params?.channel || !params?.message) {
    throw new Error('channel and message required');
  }
  const vaultUrl = process.env.VAULT_URL || 'http://localhost:4003';
  const tokenResp = await fetch(`${vaultUrl}/vault/token/${project}/slack`);
  if (tokenResp.status === 404) {
    return { status: 'error', message: 'Slack token not found' } as const;
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
    return { status: 'error', message: slackJson.error } as const;
  }
  return { status: 'success', data: { ts: slackJson.ts } } as const;
}
