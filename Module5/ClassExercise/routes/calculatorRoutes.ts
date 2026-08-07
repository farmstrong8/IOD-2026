import express from "express";
const router = express.Router();
import calculatorController from "../controllers/calculatorController";

// new route for adding two numbers
router.get("/add", (req: Request, res: Response) => {
    calculatorController.addNumbers(req, res);
});

router.get("/add", calculatorController.addNumbers);

module.exports = router;
