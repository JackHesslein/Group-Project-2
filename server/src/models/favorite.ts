import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Favorite extends Model {
  public id!: number;
  public userId!: number;
  public city!: string;
  public country!: string;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
  }
);

export default Favorite;