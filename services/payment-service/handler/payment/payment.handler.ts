import { PaymentRepository } from './../../repository/payment.repository';
import { PaymentCreatePayload } from "../../types/payment.interface";
import Stripe from 'stripe';
import { serviceConfig } from '../../configs/config';

export class PaymentHandler {
    private paymentRepository: PaymentRepository;
    private stripe: Stripe;

    constructor() {
        this.paymentRepository = new PaymentRepository();
        this.stripe = new Stripe(serviceConfig.stripe.secretKey || '')
    }

    async getPayments() {
        return this.paymentRepository.getPayments();
    }

    async getPayment(id: string) {
        return this.paymentRepository.getPayment(id);
    }

    async createPayment(payload: PaymentCreatePayload) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: payload.amount,
                currency: payload.currency,
                description: payload.description,
            });

            const payment = this.paymentRepository.createPayment(payload);

            return {
                payment,
                detail: paymentIntent,
            };
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async voidPayment(id: string) {
        try {
            return this.paymentRepository.voidPayment(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}