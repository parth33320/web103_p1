const express = require('express');
const path = require('path');
const cors = require('cors');
const { logEvent, getAuditLogs } = require('./audit');
const { getAllItems, getItemById, getCategories } = require('./itemsRepository');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Request logging middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    logEvent('API_REQUEST', {
      method: req.method,
      path: req.path,
      query: req.query,
      ip: req.ip
    });
  }
  next();
});

// REST API Endpoints
app.get('/api/items', (req, res) => {
  const { search, category, sort } = req.query;
  const items = getAllItems({ search, category, sort });
  res.json({
    total: items.length,
    items
  });
});

app.get('/api/categories', (req, res) => {
  const categories = getCategories();
  res.json({ categories });
});

app.get('/api/items/:id', (req, res) => {
  const item = getItemById(req.params.id);
  if (!item) {
    logEvent('API_GET_ITEM_NOT_FOUND', { id: req.params.id });
    return res.status(404).json({ error: 'Item not found' });
  }
  logEvent('API_GET_ITEM_SUCCESS', { id: req.params.id, title: item.title });
  res.json(item);
});

app.get('/api/audit-logs', (req, res) => {
  const logs = getAuditLogs();
  res.json({ count: logs.length, logs });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    logEvent('SERVER_START', { port: PORT });
  });
}

module.exports = app;
