/* eslint-disable @typescript-eslint/no-unused-vars */
import Sequelize, { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { TABLE_NAME } from '../utils/constant';

// Function to run when the migration being applied
export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(TABLE_NAME.CHAT, {
    chatId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
    },
    // Avatar for the chat
    //  NULL => Private chat
    avatar: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    // Name for the chat
    //  NULL => Private chat
    name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    // Description for the chat
    //  NULL => Private chat
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // Chat metadata
    //  Added for additional information
    metadata: {
      allowNull: false,
      defaultValue: {},
      type: Sequelize.JSONB,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  });
};

// Function to run when the migration being unapplied
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(TABLE_NAME.CHAT);
};
