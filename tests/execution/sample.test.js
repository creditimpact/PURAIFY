import assert from 'assert';
import fs from 'fs';
import path from 'path';

// Basic sanity check and presence of new Slack module
const slackPath = path.join(new URL('.', import.meta.url).pathname, '..', '..', 'engines', 'execution', 'src', 'slack.ts');
assert.ok(fs.existsSync(slackPath));
assert.equal(1,1);
