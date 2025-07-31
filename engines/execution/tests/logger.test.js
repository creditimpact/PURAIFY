import assert from 'assert';
import http from 'http';
import { logEvent } from '../src/actions.js';

let received = '';
const server = http.createServer((req, res) => {
  req.on('data', d => received += d.toString());
  req.on('end', () => { res.end('{}'); });
}).listen(0);
process.env.LOGS_URL = `http://localhost:${server.address().port}`;

await logEvent('info', 'test');
server.close();
assert.ok(received.includes('test'));
