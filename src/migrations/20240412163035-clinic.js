'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm cột mới 'new_column' vào bảng 'clinic'
    await queryInterface.addColumn('clinic', 'status', {
      type: Sequelize.STRING,
      allowNull: true // Thay đổi thành false nếu cột không cho phép giá trị null
    });
  },
  async down(queryInterface, Sequelize) {
    // Xóa cột 'new_column' khỏi bảng 'clinic' trong trường hợp rollback
    await queryInterface.removeColumn('clinic', 'new_column');
  }
};
