/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "https://via.placeholder.com/150"
  },

  gpa: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0.0,
      max: 4.0
    }
  }
});

// Export the student model
module.exports = Student;
