import express from 'express';
import request from 'supertest';
import aiHandler from '../../api/ai';

const app = express();
app.use(express.json());
app.post('/api/ai', aiHandler);

describe('AI Generation API', () => {
    it('should return 400 if prompt is missing', async () => {
        const response = await request(app)
            .post('/api/ai')
            .send({ type: 'bullet' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Prompt is required' });
    });

    it('should return 400 if generation type is missing or invalid', async () => {
        const response = await request(app)
            .post('/api/ai')
            .send({ prompt: 'Test prompt' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid generation type' });
    });

    // Mocking the OpenRouter API call would be needed for a full test.
});
