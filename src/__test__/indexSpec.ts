import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test MAi App', () => {
    it('Test Http Root ', async () => {
        const res = await request.get('/');
        expect(res.status).toBe(200);
    });
});
