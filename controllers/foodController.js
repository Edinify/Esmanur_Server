import { calcDate } from "../calculate/calculateDate.js";
import logger from "../config/logger.js";
import { Admin } from "../models/adminModel.js";
import { Food } from "../models/foodModel.js";

// Get Foods for pagination
export const getFoodsForPagination = async (req, res) => {
  const { monthCount, startDate, endDate } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const { id } = req.user;

  const targetDate = calcDate(monthCount, startDate, endDate);

  try {
    const currentUser = await Admin.findById(id);
    let totalPages;
    let foods;

    const foodsCount = await Food.countDocuments({
      date: {
        $gte: targetDate.startDate,
        $lte: targetDate.endDate,
      },
      branch: currentUser.branch,
    });

    totalPages = Math.ceil(foodsCount / limit);

    console.log(targetDate);

    foods = await Food.find({
      date: {
        $gte: targetDate.startDate,
        $lte: targetDate.endDate,
      },
      branch: currentUser.branch,
    })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ foods, totalPages });
  } catch (err) {
    logger.error({
      method: "GET",
      status: 500,
      message: err.message,
      query: req.query,
      for: "GET FOODS FOR PAGINATION",
      user: req.user,
      functionName: getFoodsForPagination.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Create food
export const createFood = async (req, res) => {
  const { id } = req.user;
  try {
    const currentUser = await Admin.findById(id);

    const newFood = new Food(req.body);
    await newFood.save();

    const foodsCount = await Food.countDocuments({
      branch: currentUser.branch,
    });
    const lastPage = Math.ceil(foodsCount / 10);

    res.status(201).json({ food: newFood, lastPage });
  } catch (err) {
    logger.error({
      method: "POST",
      status: 500,
      message: err.message,
      postedData: req.body,
      for: "CREATE FOOD",
      user: req.user,
      functionName: createFood.name,
    });
    res.status(500).json({ error: err.message });
  }
};

// Update food
export const updateFood = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(updatedFood);
  } catch (err) {
    logger.error({
      method: "PATCH",
      status: 500,
      message: err.message,
      foodId: id,
      updatedData: req.body,
      for: "UPDATE FOOD",
      user: req.user,
      functionName: updateFood.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Delete food
export const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food successfully deleted" });
  } catch (err) {
    logger.error({
      method: "DELETE",
      status: 500,
      message: err.message,
      foodId: id,
      for: "DELETE FOOD",
      user: req.user,
      functionName: deleteFood.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};
