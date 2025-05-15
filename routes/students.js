/*==================================================
/routes/students.js

Defines all the students-related Express API routes.
==================================================*/

const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../database/models');
const ash = require('express-async-handler');

/* GET ALL STUDENTS */
router.get('/', ash(async (req, res) => {
  let students = await Student.findAll({ include: { model: Campus, as: 'campus' } });
  res.status(200).json(students);
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async (req, res) => {
  let student = await Student.findByPk(req.params.id, {
    include: { model: Campus, as: 'campus' }
  });
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
}));

/* ADD NEW STUDENT */
router.post('/', ash(async (req, res) => {
  const { firstName, lastName, email, campusId } = req.body;
  const newStudent = await Student.create({ firstName, lastName, email });

  if (campusId) {
    const campus = await Campus.findByPk(campusId);
    if (campus) {
      await newStudent.setCampus(campus);
    }
  }

  const studentWithCampus = await Student.findByPk(newStudent.id, {
    include: { model: Campus, as: 'campus' }
  });

  res.status(201).json(studentWithCampus);
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

  const { firstName, lastName, email, campusId } = req.body;

  await student.update({ firstName, lastName, email });

  if (campusId) {
    const campus = await Campus.findByPk(campusId);
    if (campus) {
      await student.setCampus(campus);
    }
  }

  const updatedStudent = await Student.findByPk(student.id, {
    include: { model: Campus, as: 'campus' }
  });

  res.status(200).json(updatedStudent);
}));

module.exports = router;
