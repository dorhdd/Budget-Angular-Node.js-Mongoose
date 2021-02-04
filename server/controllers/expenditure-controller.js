const Expenditure = require("../models/expenditure");
const { validationResult } = require("express-validator/check");

exports.getExpenditures = (req, res) => {
  Expenditure.find({ budgetId: req.session.user.activeBudget })
    .then((expenditures) => {
      res.send(expenditures);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postExpenditure = (req, res) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsMsg = [];
    for (let error of errors.array()) {
      errorsMsg.push({ msg: error.msg });
    }
    return res.send(errorsMsg);
  }

  const expenditure = new Expenditure({
    financialType: body.financialType,
    amount: body.amount,
    description: body.description,
    budgetId: req.session.user.activeBudget,
  });
  expenditure
    .save()
    .then(() => {
      res.redirect("/home/get_expenditure");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletExpenditure = (req, res) => {
  const id = req.params.id;
  Expenditure.deleteOne({
    _id: id,
    budgetId: req.session.user.activeBudget,
  }).then(() => {
    res.redirect(303, "/home/get_expenditure");
  });
};
