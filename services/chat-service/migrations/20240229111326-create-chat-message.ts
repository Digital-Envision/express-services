/* eslint-disable @typescript-eslint/no-unused-vars */
import Sequelize, { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { TABLE_NAME } from '../utils/constant';

// Function to run when the migration being applied
export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(TABLE_NAME.CHAT_MESSAGE, {
    chatMemberId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
    },
    chatId: {
      allowNull: false,
      references: {
        model: TABLE_NAME.CHAT,
        key: 'chatId',
      },
      onDelete: 'CASCADE',
      type: Sequelize.UUID,
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
};

// Function to run when the migration being unapplied
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(TABLE_NAME.CHAT_MESSAGE);
};
