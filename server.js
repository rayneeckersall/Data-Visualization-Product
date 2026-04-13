require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'transactions.json');

app.get('/api/transactions', (req, res) => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  res.json(JSON.parse(data));
});

app.post('/api/transactions', (req, res) => {
  const txs = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const newTx = { id: Date.now().toString(), ...req.body };
  txs.push(newTx);
  fs.writeFileSync(DATA_FILE, JSON.stringify(txs, null, 2));
  res.json(newTx);
});

app.delete('/api/transactions/:id', (req, res) => {
  let txs = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  txs = txs.filter(t => t.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(txs, null, 2));
  res.json({ ok: true });
});

app.put('/api/transactions/:id', (req, res) => {
  let txs = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  txs = txs.map(t => t.id === req.params.id ? { ...t, ...req.body } : t);
  fs.writeFileSync(DATA_FILE, JSON.stringify(txs, null, 2));
  res.json({ ok: true });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => console.log('Server running'));