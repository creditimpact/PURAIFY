import axios from 'axios';

export interface SlackResponse {
  ok: boolean;
  [key: string]: any;
}

export async function sendSlackMessage(token: string, channel: string, text: string): Promise<SlackResponse> {
  const url = process.env.SLACK_API_URL || 'https://slack.com/api/chat.postMessage';
  const { data } = await axios.post(url, { channel, text }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!data.ok) {
    throw new Error(data.error || 'Slack API error');
  }
  return data;
}
