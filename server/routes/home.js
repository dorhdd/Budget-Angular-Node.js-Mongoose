const express = require("express");
const { check, body } = require("express-validator/check");

const budgetController = require("../controllers/budget-controller");
const expenditureController = require("../controllers/expenditure-controller");

const isAuth = require("../middleware/is-auth");
const hasBudget = require("../middleware/hasBudget");

const router = express.Router();

router.post("/post_budget", isAuth, budgetController.postBudget);
router.get("/get_budgets", isAuth, budgetController.getBudgets);
router.get("/get_budget", isAuth, budgetController.getOneBudget);
router.put("/edit_budget", isAuth, budgetController.editBudget);
router.delete("/delete_budget/:id", isAuth, budgetController.deleteBudget);
router.post("/openBudget", isAuth, budgetController.openBudget);

router.get(
  "/get_expenditure",
  isAuth,
  hasBudget,
  expenditureController.getExpenditures
);
router.post(
  "/save_expenditure",
  check("amount").isNumeric().withMessage("amount has to be number"),
  isAuth,
  hasBudget,
  expenditureController.postExpenditure
);
router.delete(
  "/delete_expenditure/:id",
  isAuth,
  hasBudget,
  expenditureController.deletExpenditure
);
module.exports = router;
