import { DataTypes, QueryInterface } from 'sequelize';

async function up(params: {context: QueryInterface}) {
	await params.context.createTable('user_auths', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
    authType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
    password: {
			type: DataTypes.STRING,
			allowNull: true
		},
    profileData: {
      type: DataTypes.JSON,
      allowNull: true,
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

  await params.context.addConstraint('user_auths', {
    fields: ['userId'],
    type: 'foreign key',
    name: 'fk_user_auths_userId',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
}

async function down(params: {context: QueryInterface}) {
  await params.context.removeConstraint('user_auths', 'fk_user_auths_userId');
	await params.context.dropTable('user_auths');
}

module.exports = {
	up, down
};
