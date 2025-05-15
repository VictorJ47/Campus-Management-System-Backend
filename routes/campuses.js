/*==================================================
/routes/campuses.js

It defines all the campuses-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL CAMPUSES */
router.get('/', ash(async (req, res) => {
  // Use alias 'students' as defined in the model association
  const campuses = await Campus.findAll({
    include: [{ model: Student, as: 'students' }]
  });
  res.status(200).json(campuses);
}));

/* GET CAMPUS BY ID */
router.get('/:id', ash(async (req, res) => {
  const campus = await Campus.findByPk(req.params.id, {
    include: [{ model: Student, as: 'students' }]
  });
  res.status(200).json(campus);
}));

/* DELETE CAMPUS */
router.delete('/:id', ash(async (req, res) => {
  await Campus.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json("Deleted a campus!");
}));

/* ADD NEW CAMPUS */
router.post('/', ash(async (req, res) => {
  const newCampus = await Campus.create(req.body);
  res.status(200).json(newCampus);
}));

/* EDIT CAMPUS */
router.put('/:id', ash(async (req, res) => {
  await Campus.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  const campus = await Campus.findByPk(req.params.id, {
    include: [{ model: Student, as: 'students' }]
  });
  res.status(201).json(campus);
}));

// Export router
module.exports = router;
