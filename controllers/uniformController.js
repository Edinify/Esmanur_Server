import { calcDate } from "../calculate/calculateDate.js";
import logger from "../config/logger.js";
import { Admin } from "../models/adminModel.js";
import { Uniform } from "../models/uniformModel.js";

// Get uniforms for pagination
export const getUniformsForPagination = async (req, res) => {
  const { monthCount, startDate, endDate } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const { id } = req.user;

  const targetDate = calcDate(monthCount, startDate, endDate);

  try {
    const currentUser = await Admin.findById(id);
    let totalPages;
    let uniforms;

    const uniformsCount = await Uniform.countDocuments({
      date: {
        $gte: targetDate.startDate,
        $lte: targetDate.endDate,
      },
      branch: currentUser.branch,
    });

    totalPages = Math.ceil(uniformsCount / limit);

    console.log(targetDate);

    uniforms = await Uniform.find({
      date: {
        $gte: targetDate.startDate,
        $lte: targetDate.endDate,
      },
      branch: currentUser.branch,
    })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ uniforms, totalPages });
  } catch (err) {
    logger.error({
      method: "GET",
      status: 500,
      message: err.message,
      query: req.query,
      for: "GET UNIFORMS FOR PAGINATION",
      user: req.user,
      functionName: getUniformsForPagination.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Create uniform
export const createUniform = async (req, res) => {
  const { id } = req.user;

  try {
    const currentUser = await Admin.findById(id);

    const newUniform = new Uniform(req.body);
    await newUniform.save();

    const uniformsCount = await Uniform.countDocuments({
      branch: currentUser.branch,
    });

    const lastPage = Math.ceil(uniformsCount / 10);

    res.status(201).json({ uniform: newUniform, lastPage });
  } catch (err) {
    logger.error({
      method: "POST",
      status: 500,
      message: err.message,
      postedData: req.body,
      for: "CREATE UNIFORM",
      user: req.user,
      functionName: createUniform.name,
    });
    res.status(500).json({ error: err.message });
  }
};

// Update uniform
export const updateUniform = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUniform = await Uniform.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUniform) {
      return res.status(404).json({ message: "Uniform not found" });
    }

    res.status(200).json(updatedUniform);
  } catch (err) {
    logger.error({
      method: "PATCH",
      status: 500,
      message: err.message,
      uniformId: id,
      updatedData: req.body,
      for: "UPDATE UNIFORM",
      user: req.user,
      functionName: updateUniform.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Delete uniform
export const deleteUniform = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUniform = await Uniform.findByIdAndDelete(id);

    if (!deletedUniform) {
      return res.status(404).json({ message: "Uniform not found" });
    }

    res.status(200).json({ message: "Uniform successfully deleted" });
  } catch (err) {
    logger.error({
      method: "DELETE",
      status: 500,
      message: err.message,
      uniformId: id,
      for: "DELETE UNIFORM",
      user: req.user,
      functionName: deleteUniform.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};
