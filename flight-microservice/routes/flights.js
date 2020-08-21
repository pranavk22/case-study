const router = require("express").Router();
let Flight = require("../models/flight");

router.route("/").get((req, res) => {
  Flight.find()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const name = req.body.name;
  const from = req.body.from;
  const to = req.body.to;
  const date = Date.parse(req.body.date);
  const fare = Number(req.body.fare);

  const newFlight = new Flight({
    name,
    from,
    to,
    date,
    fare,
  });

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
  Flight.findById(req.params.id)
    .then((flight) => {
      flight.name = req.body.name;
      flight.from = req.body.from;
      flight.to = req.body.to;
      flight.date = Date.parse(req.body.date);
      flight.fare = Number(req.body.fare);

      flight
        .save()
        .then(() => res.json("Flight updated!"))
        .catch((err) => res.status(500).json("Error: " + err));
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/search").post((req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const date = Date.parse(req.body.date);
  Flight.find({ from: from, to: to, date: date })
    .exec()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
