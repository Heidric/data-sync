import {Model, DataTypes} from 'sequelize';

class CarData extends Model {}

module.exports = (sequelize) => {
  CarData.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    date: {type: DataTypes.DATE},
    lat: {type: DataTypes.STRING},
    lng: {type: DataTypes.STRING},
  },{
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'car_data',
    indexes:[
      {
        unique: true,
        fields:['name']
      },

      {
        fields:[
          'name',
          'date',
          'lat',
          'lng',
        ],
      },
    ],
  });

  return CarData;
};
