import { calcDate } from "../calculate/calculateDate.js";
import logger from "../config/logger.js";
import { Income } from "../models/incomeModel.js";

// Get incomes for pagination
export const getIncomesForPagination = async (req, res) => {
  const { monthCount, startDate, endDate } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const targetDate = calcDate(monthCount, startDate, endDate);

  try {
    let totalPages;
    let incomes;

    const incomesCount = await Income.countDocuments({
      date: {
        $gte: targetDate.startDate,
        $lte: targetDate.endDate,
      },
    });

    totalPages = Math.ceil(incomesCount / limit);

    console.log(targetDate);

    incomes = await Income.find({
      date: {
        $gte: targetDate.startDate,
        $lte: targetDate.endDate,
      },
    })
      .skip((page - 1) * limit)
      .limit(limit);

    console.log(incomes);

    res.status(200).json({ incomes, totalPages });
  } catch (err) {
    logger.error({
      method: "GET",
      status: 500,
      message: err.message,
      query: req.query,
      for: "GET INCOMES FOR PAGINATION",
      user: req.user,
      functionName: getIncomesForPagination.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Create income
export const createIncome = async (req, res) => {
  
  try {
    const newIncome = new Income(req.body);
    await newIncome.save();

    const incomesCount = await Income.countDocuments();
    const lastPage = Math.ceil(incomesCount / 10);

    res.status(201).json({ income: newIncome, lastPage });
  } catch (err) {
    logger.error({
      method: "POST",
      status: 500,
      message: err.message,
      postedData: req.body,
      for: "CREATE INCOME",
      user: req.user,
      functionName: createIncome.name,
    });
    res.status(500).json({ error: err.message });
  }
};

// Update income
export const updateIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json(updatedIncome);
  } catch (err) {
    logger.error({
      method: "PATCH",
      status: 500,
      message: err.message,
      incomeId: id,
      updatedData: req.body,
      for: "UPDATE INCOME",
      user: req.user,
      functionName: updateIncome.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Delete income
export const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income successfully deleted" });
  } catch (err) {
    logger.error({
      method: "DELETE",
      status: 500,
      message: err.message,
      incomeId: id,
      for: "DELETE INCOME",
      user: req.user,
      functionName: deleteIncome.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};
