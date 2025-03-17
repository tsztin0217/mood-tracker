const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async(req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    const logs = currentUser.logs || [];
    const uniqueMoods = logs.reduce((acc, log)=> {
        if (!acc.includes(log.mood)){
            acc.push(log.mood);
        }
        return acc;
    }, []);
    console.log(uniqueMoods)
    res.render('moods/index.ejs', {currentUser, uniqueMoods});
}) 


router.get('/new', (req, res) => {
    res.render('moods/new.ejs');
})


router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.logs.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/moods`)
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
 })

 
module.exports = router;