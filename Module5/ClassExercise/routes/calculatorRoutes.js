const express = require("express");
const router = express.Router();
const calculatorController = require("../controllers/calculatorController");

// new route for adding two numbers
router.get("/add", (req, res) => {
    calculatorController.addNumbers(req, res);
});

// router.get("/add", calculatorController.addNumbers);

module.exports = router;
