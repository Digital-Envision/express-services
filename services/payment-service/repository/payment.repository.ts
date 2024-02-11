import { PaymentCreatePayload } from './../types/payment.interface';
import models from '../models/index';
import { PaymentStatus } from '../utils/constants';
import sequelize from '../utils/sequelize';

export class PaymentRepository {
    private models;
    private sequelize;

    constructor() {
        this.models = models;
        this.sequelize = sequelize;
    }

    async getPayment(id: string) {
        try {
            return this.models.Payments.findByPk(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createPayment(payload: PaymentCreatePayload) {
        const transaction = await this.sequelize.transaction();
        try {
            const payment = await this.models.Payments.create(payload, { transaction });
            await transaction.commit();
            return payment;
        } catch (error) {
            await transaction.rollback();
            throw new Error(error);
        }
    }

    async setStatus(id: string, status: PaymentStatus) {
        try {
            return this.models.Payments.update({ status }, { where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async voidPayment(id: string) {
        const transaction = await sequelize.transaction();
        try {
            await this.models.Payments.update({ void_at: new Date() }, { where: { id }, transaction });
            await transaction.commit();
        } catch (error) {
            throw new Error(error);
        }
    }
}