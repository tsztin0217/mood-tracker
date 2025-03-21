const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    const logs = currentUser.logs || [];
    const uniqueMoods = logs.reduce((acc, log) => {
        if (!acc.includes(log.mood)) {
            acc.push(log.mood);
        }
        return acc;
    }, []);
    res.render('moods/index.ejs', { currentUser, uniqueMoods });
})


router.get('/new', (req, res) => {
    res.render('moods/new.ejs', { mood: req.query.mood || '' });
})


router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.logs.push(req.body);
        await currentUser.save();
        const currentLog = currentUser.logs[currentUser.logs.length - 1]
        res.redirect(`/users/${currentUser._id}/moods/${currentLog.mood}`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})


router.get('/:moodName', async (req, res) => {
    try {
        const { moodName } = req.params;
        const currentUser = await User.findById(req.session.user._id);
        const moodLogs = currentUser.logs.filter(log => log.mood === moodName);
        res.render('moods/show.ejs', { currentUser, moodName, moodLogs });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.delete('/:moodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.logs.id(req.params.moodId).deleteOne();

        await currentUser.save();
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:logId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const log = currentUser.logs.id(req.params.logId);
        res.render('moods/edit.ejs', { log });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.put('/:logId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const log = currentUser.logs.id(req.params.logId);
        log.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/moods/${log.mood}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})
module.exports = router;