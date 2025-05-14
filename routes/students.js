/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS */
router.get('/', ash(async (req, res) => {
  let students = await Student.findAll({ include: [Campus] });
  res.status(200).json(students);
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async (req, res) => {
  let student = await Student.findByPk(req.params.id, { include: [Campus] });
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
}));

/* ADD NEW STUDENT */
router.post('/', ash(async (req, res) => {
  const { firstname, lastname, campusId } = req.body;

  // Validate campusId (if provided)
  const campus = campusId ? await Campus.findByPk(campusId) : null;
  if (campusId && !campus) {
    return res.status(400).json({ error: "Campus not found" });
  }

  const newStudent = await Student.create({
    firstname,
    lastname,
  });

  // Associate the student with a campus if campusId is provided
  if (campusId) {
    await newStudent.setCampus(campus);
  }

  res.status(201).json(newStudent); // Status 201 Created
}));

/* DELETE STUDENT */
router.delete('/:id', ash(async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  await student.destroy();
  res.status(200).json({ message: "Student deleted" });
}));

/* EDIT STUDENT */
router.put('/:id', ash(async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const { firstname, lastname, campusId } = req.body;

  // Update student fields
  await student.update({
    firstname,
    lastname,
  });

  // Update campus if provided
  if (campusId) {
    const campus = await Campus.findByPk(campusId);
    if (!campus) {
      return res.status(400).json({ error: "Campus not found" });
    }
    await student.setCampus(campus);
  }

  // Fetch the updated student
  const updatedStudent = await student.reload();
  res.status(200).json(updatedStudent); // Status 200 OK
}));

// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;