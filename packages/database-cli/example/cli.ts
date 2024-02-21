import { DatabaseCli } from '../dist';

// Passing null will result in no migrations/seeder being applied
const cli = new DatabaseCli(null);
cli.execute();
