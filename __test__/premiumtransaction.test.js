const mongoose = require('mongoose');
const PremiumTransaction = require('../models/PremiumTransaction');

describe('create premium transaction', () => {
    const MONGO_URI = `mongodb+srv://Kuzuryuz:1234@coworkingspace.nr0wkau.mongodb.net/?retryWrites=true&w=majority&appName=CoworkingSpace`

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI);
    });

    test("TC2-1", async () => {
        await PremiumTransaction.create({
            user: "662e441a8cf8d7fab206a88e",
            membership: "Individual(month)",
            studentcard: "image.test",
            cost: "200",
            bank: "Kbank",
            slip: "image.test",
            status: "pending",
        }).then((transaction) => {
            expect(transaction).toBeDefined();
            expect(transaction._id).toBeDefined();
            expect(transaction.membership).toBe("Individual(month)");
            expect(transaction.studentcard).toBe("image.test");
            expect(transaction.cost).toBe("200");
            expect(transaction.bank).toBe("Kbank");
            expect(transaction.slip).toBe("image.test");
            expect(transaction.status).toBe("pending");
        });
    });

    test('TC2-2', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(month)',
            cost: '200',
            bank: 'Kbank',
            slip: 'image.test',
            status: 'pending'
        })
            .then(transaction => {
                expect(transaction).toBeDefined();
                expect(transaction._id).toBeDefined();
                expect(transaction.membership).toBe('Individual(month)');
                expect(transaction.cost).toBe('200');
                expect(transaction.bank).toBe('Kbank');
                expect(transaction.slip).toBe('image.test');
                expect(transaction.status).toBe('pending');
            })
    });

    test('TC2-3', async () => {
        await PremiumTransaction.create({
            user: 'abc123',
            membership: 'Individual(month)',
            cost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-4', async () => {
        await PremiumTransaction.create({
            membership: 'Individual(month)',
            cost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-5', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(day)',
            cost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-6', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            cost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-7', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(month)',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-8', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(month)',
            cost: '200',
            bank: 'TTB',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-9', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(month)',
            cost: '200',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-10', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(month)',
            cost: '200',
            bank: 'Kbank'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });

    test('TC2-11', async () => {
        await PremiumTransaction.create({
            user: '662e441a8cf8d7fab206a88e',
            membership: 'Individual(month)',
            cost: '200',
            bank: 'Kbank',
            slip: 'image.test',
            status: 'IDK'
        })
            .catch(err => {
                expect(err).toBeDefined();
            })
    });
});