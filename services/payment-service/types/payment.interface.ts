export interface PaymentsAttributes {
    id: number;
    amount: number;
    currency: string;
    status: string;
    transaction_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface PaymentCreatePayload {
    amount: number;
    currency: string;
    status: string;
    transaction_id: string;
    description?: string;
}