import express from 'express';
import request from 'supertest';
import aiHandler from '../../api/ai';

const app = express();
app.use(express.json());
app.post('/api/ai', aiHandler as any);

describe('AI Generation API', () => {
    it('should return 400 if prompt is missing', async () => {
        const response = await request(app)
            .post('/api/ai')
            .send({ type: 'bullet' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ success: false, error: 'Prompt is required' });
    });

    it('should handle successful AI generation (mocked)', async () => {
        const response = await request(app)
            .post('/api/ai')
            .send({ prompt: 'Test prompt', type: 'bullet' });

        // Since we mocked everything to succeed or fallback
        // It should return 200 if keys are present (setupTests has API_KEY)
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // Mocking the OpenRouter API call would be needed for a full test.
});
