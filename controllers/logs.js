const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('moods/index.ejs');
}) 


router.get('/new', (req, res) => {
    res.render('moods/new.ejs');
})

module.exports = router;