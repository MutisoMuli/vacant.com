module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      propertyID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      propertyType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size: DataTypes.INTEGER,
      condition: DataTypes.STRING,
      availableStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      ownerContact: DataTypes.JSONB,
      lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Property;
  };