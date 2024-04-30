const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

describe('create transaction', () => {
    const MONGO_URI = `mongodb+srv://Kuzuryuz:1234@coworkingspace.nr0wkau.mongodb.net/?retryWrites=true&w=majority&appName=CoworkingSpace`

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI);
    });

    test('TC1-1', async () => {
        await Transaction.create({
            reservation: '662bda46924fa033b3e01f9c',
            user: '662e441a8cf8d7fab206a88e',
            totalcost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .then(transaction => {
                expect(transaction).toBeDefined();
                expect(transaction._id).toBeDefined();
                expect(transaction.totalcost).toBe('200');
                expect(transaction.bank).toBe('Kbank');
                expect(transaction.slip).toBe('image.test');
            })
    });

    test('TC1-2', async () => {
        await Transaction.create({
            reservation: 'abc123',
            user: '662e441a8cf8d7fab206a88e',
            totalcost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined()
            })
    });

    test('TC1-3', async () => {
        await Transaction.create({
            user: '662e441a8cf8d7fab206a88e',
            totalcost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined()
            })
    });

    test('TC1-4', async () => {
        await Transaction.create({
            reservation: '662bda46924fa033b3e01f9c',
            user: 'abc123',
            totalcost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined()
            })
    });

    test('TC1-5', async () => {
        await Transaction.create({
            reservation: '662bda46924fa033b3e01f9c',
            totalcost: '200',
            bank: 'Kbank',
            slip: 'image.test'
        })
            .catch(err => {
                expect(err).toBeDefined()
            })
    });

    test("TC1-6", async () => {
        await Transaction.create({
            reservation: "662bda46924fa033b3e01f9c",
            user: "662e441a8cf8d7fab206a88e",
            bank: "Kbank",
            slip: "image.test",
        }).catch((err) => {
            expect(err).toBeDefined();
        });
    });

    test("TC1-7", async () => {
        await Transaction.create({
            reservation: "662bda46924fa033b3e01f9c",
            user: "662e441a8cf8d7fab206a88e",
            cost: "200",
            bank: "TTB",
            slip: "image.test",
        }).catch((err) => {
            expect(err).toBeDefined();
        });
    });

    test("TC1-8", async () => {
        await Transaction.create({
            reservation: "662bda46924fa033b3e01f9c",
            user: "662e441a8cf8d7fab206a88e",
            cost: "200",
            slip: "image.test",
        }).catch((err) => {
            expect(err).toBeDefined();
        });
    });

    test("TC1-9", async () => {
        await Transaction.create({
            reservation: "662bda46924fa033b3e01f9c",
            user: "662e441a8cf8d7fab206a88e",
            cost: "200",
            bank: "Kbank",
        }).catch((err) => {
            expect(err).toBeDefined();
        });
    });
});