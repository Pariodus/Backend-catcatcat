const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
    token = jwt.sign({id: '6602d50adef3150b6cbedb33'}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
})

describe('add transaction api', () => {
    test('TC1-1', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reservation: '662bda46924fa033b3e01f9c',
                totalcost: '200',
                bank: 'Kbank',
                slip: 'image.test'
            })

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.reservation).toBe('662bda46924fa033b3e01f9c');
        expect(response.body.data.user).toBe('6602d50adef3150b6cbedb33');
        expect(response.body.data.totalcost).toBe('200');
        expect(response.body.data.bank).toBe('Kbank');
        expect(response.body.data.slip).toBe('image.test');
    });

    test('TC1-2', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reservation: 'abc123',
                totalcost: '200',
                bank: 'Kbank',
                slip: 'image.test'
            })

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.data).not.toBeDefined();
        expect(response.body.message).toBe('Cannot create Transaction');
    });

    test('TC1-3', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                totalcost: '200',
                bank: 'Kbank',
                slip: 'image.test'
            })

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.data).not.toBeDefined();
        expect(response.body.message).toBe('Cannot create Transaction');
    });

    test('TC1-4', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reservation: "662bda46924fa033b3e01f9c",
                bank: "Kbank",
                slip: "image.test"
            })

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.data).not.toBeDefined();
        expect(response.body.message).toBe('Cannot create Transaction');
    });

    test('TC1-5', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reservation: "662bda46924fa033b3e01f9c",
                cost: "200",
                bank: "TTB",
                slip: "image.test"
            })

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.data).not.toBeDefined();
        expect(response.body.message).toBe('Cannot create Transaction');
    });

    test("TC1-6", async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reservation: "662bda46924fa033b3e01f9c",
                cost: "200",
                slip: "image.test"
            })

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.data).not.toBeDefined();
        expect(response.body.message).toBe('Cannot create Transaction');
    });

    test("TC1-7", async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reservation: "662bda46924fa033b3e01f9c",
                cost: "200",
                bank: "Kbank"
            })

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.data).not.toBeDefined();
        expect(response.body.message).toBe('Cannot create Transaction');
    });
});

describe('add premium transaction api', () => {
    test("TC2-1", async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                studentcard: "image.test",
                cost: "200",
                bank: "Kbank",
                slip: "image.test",
                status: "pending",
            })

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.user).toBe('6602d50adef3150b6cbedb33');
        expect(response.body.data.membership).toBe('Individual(month)');
        expect(response.body.data.studentcard).toBe('image.test');
        expect(response.body.data.cost).toBe('200');
        expect(response.body.data.bank).toBe('Kbank');
        expect(response.body.data.slip).toBe('image.test');
        expect(response.body.data.status).toBe('pending');
    });

    test('TC2-2', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                cost: "200",
                bank: "Kbank",
                slip: "image.test",
            })

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.user).toBe('6602d50adef3150b6cbedb33');
        expect(response.body.data.membership).toBe('Individual(month)');
        expect(response.body.data.cost).toBe('200');
        expect(response.body.data.bank).toBe('Kbank');
        expect(response.body.data.slip).toBe('image.test');
        expect(response.body.data.status).toBe('pending');
    });

    test('TC2-3', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(day)",
                cost: "200",
                bank: "Kbank",
                slip: "image.test",
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });

    test('TC2-4', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                cost: "200",
                bank: "Kbank",
                slip: "image.test",
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });

    test('TC2-5', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                bank: "Kbank",
                slip: "image.test",
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });

    test('TC2-6', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                cost: '200',
                bank: 'TTB',
                slip: "image.test",
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });

    test('TC2-7', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                cost: '200',
                slip: "image.test",
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });

    test('TC2-8', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                cost: '200',
                bank: 'Kbank'
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });

    test('TC2-9', async () => {
        const response = await request(app)
            .post('/api/premiumtransactions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                membership: "Individual(month)",
                cost: '200',
                bank: 'Kbank',
                slip: "image.test",
                status: 'IDK'
            })
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.data).not.toBeDefined();
            expect(response.body.message).toBe('Cannot create Premium Transaction');
    });
});