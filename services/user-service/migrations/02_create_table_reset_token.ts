import { DataTypes, QueryInterface } from 'sequelize';

async function up(params: {context: QueryInterface}) {
	await params.context.createTable('reset_tokens', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		authId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false
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

  await params.context.addConstraint('reset_tokens', {
    fields: ['authId'],
    type: 'foreign key',
    name: 'fk_reset_tokens_authId',
    references: {
      table: 'user_auths',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
}

async function down(params: {context: QueryInterface}) {
  await params.context.removeConstraint('reset_tokens', 'fk_reset_tokens_authId');
	await params.context.dropTable('reset_tokens');
}

module.exports = {
	up, down
};
