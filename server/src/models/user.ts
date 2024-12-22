import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import argon2 from 'argon2';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  public comparePassword!: (candidatePassword: string) => Promise<boolean>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user: User) => {
        if (user.changed('password')) {
          user.password = await argon2.hash(user.password);
        }
      },
    },
  }
);

export default User;