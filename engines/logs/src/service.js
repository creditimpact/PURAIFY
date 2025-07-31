import fs from 'fs';
import path from 'path';

const DATA_FILE = process.env.LOGS_DATA_FILE || path.join(__dirname, 'logs.json');

function loadLogsFromDisk() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLogsToDisk(logs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
}

let logs = loadLogsFromDisk();

export function addLog(entry) {
  const log = {
    timestamp: entry.timestamp || new Date().toISOString(),
    level: entry.level,
    message: entry.message,
    engine: entry.engine,
  };
  logs.push(log);
  saveLogsToDisk(logs);
  return log;
}

export function queryLogs(filters = {}) {
  return logs.filter(l => {
    if (filters.engine && l.engine !== filters.engine) return false;
    if (filters.level && l.level !== filters.level) return false;
    return true;
  });
}

export function getAllLogs() {
  return logs.slice();
}

export function clearLogs() {
  logs = [];
  saveLogsToDisk(logs);
}
