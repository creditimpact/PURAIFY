import assert from 'assert';
import { httpRequest } from '../src/actions.js';
import http from 'http';

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, method: req.method, body: data || null }));
  });
}).listen(0);

const url = `http://localhost:${server.address().port}`;

(async () => {
  const getRes = await httpRequest(undefined, { url });
  assert.deepStrictEqual(getRes, { status: 'success', data: { ok: true, method: 'GET', body: null } });

  const postRes = await httpRequest(undefined, { url, method: 'POST', body: { a: 1 } });
  assert.strictEqual(postRes.status, 'success');
  assert.strictEqual(postRes.data.method, 'POST');
  server.close();
})();
