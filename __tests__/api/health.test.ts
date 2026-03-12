import express from 'express';
import request from 'supertest';
import healthHandler from '../../api/health';

const app = express();
app.get('/api/health', healthHandler);

describe('Health API', () => {
    it('should return 200 and OK status', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'OK' });
    });
});
