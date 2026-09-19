const fs = require('fs');
const path = require('path');

const AUDIT_FILE = path.join(__dirname, '../data/audit.jsonl');

function logEvent(eventType, payload = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: eventType,
    payload
  };

  const line = JSON.stringify(logEntry) + '\n';

  try {
    fs.appendFileSync(AUDIT_FILE, line, 'utf8');
  } catch (err) {
    console.error('Failed to append to audit log:', err);
  }
}

function getAuditLogs() {
  if (!fs.existsSync(AUDIT_FILE)) {
    return [];
  }
  const content = fs.readFileSync(AUDIT_FILE, 'utf8');
  return content
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

module.exports = {
  logEvent,
  getAuditLogs
};
