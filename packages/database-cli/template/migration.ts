/* eslint-disable @typescript-eslint/no-unused-vars */
import Sequelize, { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

// Function to run when the migration being applied
export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {};

// Function to run when the migration being unapplied
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {};
