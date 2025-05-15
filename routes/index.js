// /routes/index.js

const express = require('express');
const router = express.Router();

const studentsRouter = require('./students');   
const campusesRouter = require('./campuses');  

router.use('/students', studentsRouter);
router.use('/campuses', campusesRouter);

module.exports = router;

