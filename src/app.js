const express = require('express');

const app = express();
app.use(express.json());

const items = [
  { id: 1, name: 'Widget', quantity: 10 },
  { id: 2, name: 'Gadget', quantity: 5 },
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/items', (req, res) => {
  res.json({ items });
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { name, quantity } = req.body;
  if (!name || typeof quantity !== 'number') {
    return res.status(400).json({ error: 'name and quantity (number) are required' });
  }
  const item = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    name,
    quantity,
  };
  items.push(item);
  res.status(201).json(item);
});

module.exports = app;
