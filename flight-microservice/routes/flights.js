const router = require("express").Router();
let Flight = require("../models/flight");

router.route("/").get((req, res) => {
  Flight.find()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const newFlight = new Flight(req.body);

  newFlight
    .save()
    .then((result) => res.status(201).json("Flight added!"))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Flight.findById(req.params.id)
    .then((flight) => res.status(200).json(flight))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Flight deleted."))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").patch((req, res) => {
  Flight.findByIdAndUpdate(req.params.id, req.body)
    .then(res.json("Flight updated!"))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/search").post((req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const startDate = Date.parse(req.body.date);
  const endDate = startDate + 24 * 60 * 60 * 1000;
  console.log(endDate);
  Flight.find({ from, to, date: { $gte: startDate, $lt: endDate } })
    .exec()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
