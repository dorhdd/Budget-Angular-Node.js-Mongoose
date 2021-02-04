const Budget = require("../models/budget");
const Expenditure = require("../models/expenditure");

// exports.getInitailAmount = (req, res) => {
//   Budget.findById(req.session.user.activeBudget)
//     .select("initailAmount -_id")
//     .then((initailAmount) => {
//       if (initailAmount) {
//         res.send(initailAmount);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

exports.postBudget = (req, res) => {
  const body = req.body;
  const budget = new Budget({
    budgetName: body.budgetName,
    initailAmount: body.initailAmount,
    endDate: body.endDate,
    monthlyIncome: body.monthlyIncome,
    userId: req.session.user._id,
  });
  budget
    .save()
    .then((budget) => {
      req.session.user.activeBudget = budget._id;
      req.session.save();
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.editBudget = (req, res) => {
  const body = req.body;
  Budget.findById(body._id)
    .then((budget) => {
      budget.budgetName = body.budgetName;
      budget.initailAmount = body.initailAmount;
      budget.endDate = body.endDate;
      budget.monthlyIncome = body.monthlyIncome;
      return budget.save();
    })
    .then((result) => {
      res.redirect(303, "/home/get_budgets");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getBudgets = (req, res, next) => {
  Budget.find({ userId: req.session.user._id })
    .then((budget) => {
      res.send(budget);
    })
    .catch((err) => {
      console.log(err);
      
    });
};

exports.getOneBudget = (req, res) => {
  Budget.findOne({
    userId: req.session.user._id,
    _id: req.session.user.activeBudget,
  })
    .select("-userId")
    .then((budget) => {
      if (!budget) {
        return console.log("NO BUDGET");
      }
      if (new Date().getDate() === 1) {
        budget.initailAmount = budget.initailAmount + budget.monthlyIncome;
        budget.save();
      }
      res.send(budget);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteBudget = (req, res) => {
  const id = req.params.id;
  Budget.deleteOne({ _id: id })
    .then((result) => {
      Budget.findOne({ userId: req.session.user._id })
        .then((budget) => {
          if (!budget) {
            req.session.user.activeBudget = null;
          } else {
            req.session.user.activeBudget = budget._id;
          }
          req.session.save();
        })
        .then(() => {
          Expenditure.deleteMany({ budgetId: id }).then(() => {
            console.log("ALL EXPENDITURES DELETED");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      res.redirect(303, "/home/get_budgets");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.openBudget = (req, res) => {
  req.session.user.activeBudget = req.body.id;
  req.session.save();
  res.send({ redirect: "/" });
};
