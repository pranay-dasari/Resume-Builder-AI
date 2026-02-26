import express from 'express';
import request from 'supertest';
import atsScoreHandler from '../../api/ats-score';

const app = express();
app.use(express.json());
app.post('/api/ats-score', atsScoreHandler);

describe('ATS Score API', () => {
    it('should return 400 if resumeText or jobDescription is missing', async () => {
        const response = await request(app)
            .post('/api/ats-score')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Missing required parameters: resumeText, jobDescription'
        });
    });

    // Since we don't want to actually call the Gemini API during tests,
    // we would ideally mock the @google/genai SDK in a more complex setup.
    // For basic testing, we ensure validation works.
});
