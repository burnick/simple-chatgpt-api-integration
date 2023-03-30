import request from 'supertest';
import server from '@/index';
import { expect } from 'chai';

describe('Message Endpoint Unit tests for Default Root', () => {
  it(`Message Endpoint check message: Welcome to default api route`, async () => {
    const res = await request(server).get('/');
    expect(res).to.have.property('status', 200);
    expect(res.header).to.have.property(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.body).to.have.property(
      'message',
      'Welcome to default api route'
    );
  });
});
