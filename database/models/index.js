/*==================================================
/database/models/index.js

It registers models, sets up associations between tables, and generates barrel file for exporting the models.
==================================================*/
const Student = require('./Student');
const Campus = require('./Campus');

Student.belongsTo(Campus, { as: 'campus', foreignKey: 'campusId' });
Campus.hasMany(Student, { as: 'students', foreignKey: 'campusId' });

module.exports = {
  Student,
  Campus,
};
