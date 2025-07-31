import assert from 'assert';
import http from 'http';
import { logEvent } from '../src/index.js';

let body = '';
const server = http.createServer((req, res) => {
  req.on('data', d => body += d.toString());
  req.on('end', () => res.end('{}'));
}).listen(0);

process.env.LOGS_URL = `http://localhost:${server.address().port}`;
await logEvent('info', 'gw test');
server.close();
assert.ok(body.includes('gw test'));

