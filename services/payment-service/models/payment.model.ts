import { DataTypes, Sequelize } from "sequelize";

const definePaymentsModel = (sequelizeConnection: Sequelize) => {
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
        transactionId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'transaction_id',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            field: 'updated_at',
        },
        voidAt: {
            type: DataTypes.DATE,
            field: 'void_at',
        }
    },
        {
            freezeTableName: true,
            tableName: 'payments',
            paranoid: false,
        });

    return Payments;
}

export default definePaymentsModel;