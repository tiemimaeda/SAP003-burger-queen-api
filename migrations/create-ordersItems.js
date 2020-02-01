'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ordersItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model:'products', key:'id'}
      },
      ordersId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model:'orders', key:'id'}
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ordersItems');
  }
};