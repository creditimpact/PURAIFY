import assert from 'assert';
process.env.LOGS_DATA_FILE = new URL('./test-logs.json', import.meta.url).pathname;
const svc = await import('../src/service.js');
svc.clearLogs();
svc.addLog({ level: 'info', message: 'one', engine: 'exec' });
svc.addLog({ level: 'error', message: 'two', engine: 'builder' });
assert.strictEqual(svc.queryLogs({ engine: 'exec' }).length, 1);
assert.strictEqual(svc.queryLogs({ level: 'error' }).length, 1);
