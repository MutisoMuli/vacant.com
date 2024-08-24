module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Properties', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
          title: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          description: {
              type: Sequelize.TEXT,
              allowNull: false,
          },
          price: {
              type: Sequelize.DECIMAL(10, 2),
              allowNull: false,
          },
          bedrooms: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          bathrooms: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          address: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          latitude: {
              type: Sequelize.DECIMAL(10, 8),
              allowNull: false,
          },
          longitude: {
              type: Sequelize.DECIMAL(11, 8),
              allowNull: false,
          },
          available: {
              type: Sequelize.BOOLEAN,
              defaultValue: true,
          },
          ownerContact: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.fn('now'),
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.fn('now'),
          }
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Properties');
  }
};
