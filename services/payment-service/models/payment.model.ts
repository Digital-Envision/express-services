import { DataTypes, Sequelize } from "sequelize";

const definePaymentsModel = (sequelizeConnection) => {
    const Payments = sequelizeConnection.define('Payments', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transaction_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
        },
        void_at: {
            type: DataTypes.DATE,
        }
    },
        {
            freezeTableName: true,
            tableName: 'payments',
            paranoid: true,
        });

    return Payments;
}

export default definePaymentsModel;