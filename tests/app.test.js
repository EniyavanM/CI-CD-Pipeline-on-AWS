const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.ok(res.body.timestamp);
  });
});

describe('GET /api/items', () => {
  it('returns a list of items', async () => {
    const res = await request(app).get('/api/items');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.items));
    assert.ok(res.body.items.length >= 2);
  });
});

describe('GET /api/items/:id', () => {
  it('returns a single item', async () => {
    const res = await request(app).get('/api/items/1');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 1);
    assert.ok(res.body.name);
  });

  it('returns 404 for unknown item', async () => {
    const res = await request(app).get('/api/items/9999');
    assert.equal(res.status, 404);
    assert.equal(res.body.error, 'Item not found');
  });
});

describe('POST /api/items', () => {
  it('creates a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Gizmo', quantity: 3 });
    assert.equal(res.status, 201);
    assert.equal(res.body.name, 'Gizmo');
    assert.equal(res.body.quantity, 3);
    assert.ok(res.body.id);
  });

  it('returns 400 for invalid payload', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Broken' });
    assert.equal(res.status, 400);
    assert.equal(res.body.error, 'name and quantity (number) are required');
  });
});
