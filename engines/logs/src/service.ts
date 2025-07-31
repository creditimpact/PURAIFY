import fs from 'fs';
import path from 'path';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  engine?: string;
}

const DATA_FILE = process.env.LOGS_DATA_FILE || path.join(__dirname, 'logs.json');

function loadLogsFromDisk(): LogEntry[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLogsToDisk(logs: LogEntry[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
}

let logs: LogEntry[] = loadLogsFromDisk();

export function addLog(entry: Omit<LogEntry, 'timestamp'> & { timestamp?: string }): LogEntry {
  const log: LogEntry = {
    timestamp: entry.timestamp || new Date().toISOString(),
    level: entry.level,
    message: entry.message,
    engine: entry.engine,
  };
  logs.push(log);
  saveLogsToDisk(logs);
  return log;
}

export function queryLogs(filters: { engine?: string; level?: string } = {}): LogEntry[] {
  return logs.filter(l => {
    if (filters.engine && l.engine !== filters.engine) return false;
    if (filters.level && l.level !== filters.level) return false;
    return true;
  });
}

export function getAllLogs(): LogEntry[] {
  return logs.slice();
}

export function clearLogs(): void {
  logs = [];
  saveLogsToDisk(logs);
}
