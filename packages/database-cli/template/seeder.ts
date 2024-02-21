/* eslint-disable @typescript-eslint/no-unused-vars */
import Sequelize, { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

// Function to run when the seeder being applied
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {};

// Function to run when the seeder being unapplied
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {};
