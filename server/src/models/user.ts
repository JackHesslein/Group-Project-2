import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import argon2 from 'argon2';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public searchHistory!: string[];

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
    searchHistory: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
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

User.prototype.comparePassword = async function (candidatePassword: string) {
  return await argon2.verify(this.password, candidatePassword);
};

export default User;