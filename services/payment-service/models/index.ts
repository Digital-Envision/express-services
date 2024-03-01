import sequelize from "../utils/sequelize";
import definePaymentsModel from './payment.model';

const Payments = definePaymentsModel(sequelize);

const models = {
    Payments,
};

export default models;