const Workout = require('../models/workout.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/api/workouts', ({ body }, res) => {
    Workout.create({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

router.put('/api/workouts/:id', ({ params, body }, res) => {
    console.log('Parameters', body, params);

    Workout.findOneAndUpdate(
        { _id: params.id },
        { $push: { exercises: body } },
        { new: true }
    )
    .then((dbWOrkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get('/api/workouts', (req, res) => {
    Workout.find({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;