const Workout = require("../models/workout");
const router = require('express').Router();

// get previous workouts
router.get("/api/workouts", (req, res) => {
 db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
     res.status(400).json(err);
  });
});

// create a new workout
router.post("/", ({body}, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });

// add exercises
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true, runValidators: true })
  .then(dbWorkout => {
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});

// get workout summary 
  router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{
      $addfields: {
        totalDuration: {$sum: '$exercises.duration'},
        totalWeight: {$sum:'$exercises.weight'},
      }
    }])
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });

module.exports = router;