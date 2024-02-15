import { DataTypes, QueryInterface } from 'sequelize';

async function up(params: {context: QueryInterface}) {
	await params.context.createTable('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
}

async function down(params: {context: QueryInterface}) {
	params.context.dropTable('users');
}

module.exports = {
	up, down
};
