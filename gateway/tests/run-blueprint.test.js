import assert from 'assert';
import http from 'http';
import { runBlueprint } from '../src/index.js';

// mock validation engine
let validationReceived = '';
const validationServer = http.createServer((req, res) => {
  req.on('data', d => validationReceived += d.toString());
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ valid: true }));
  });
}).listen(0);

// mock execution engine
let executionCalls = [];
const executionServer = http.createServer((req, res) => {
  let body = '';
  req.on('data', d => body += d.toString());
  req.on('end', () => {
    executionCalls.push(JSON.parse(body).action);
    res.setHeader('Content-Type', 'application/json');
    if (executionCalls.length === 2) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'fail' }));
    } else {
      res.end(JSON.stringify({ ok: true }));
    }
  });
}).listen(0);

process.env.VALIDATION_URL = `http://localhost:${validationServer.address().port}`;
process.env.EXECUTION_URL = `http://localhost:${executionServer.address().port}`;

const blueprint = {
  actions: [
    { type: 'one' },
    { type: 'two' },
    { type: 'three' }
  ]
};

const res = await runBlueprint('p1', blueprint);
executionServer.close();
validationServer.close();

assert.strictEqual(res.results.length, 3);
assert.strictEqual(res.results[0].status, 'success');
assert.strictEqual(res.results[1].status, 'error');
assert.strictEqual(res.results[2].status, 'success');
assert.ok(validationReceived.includes('actions'));
