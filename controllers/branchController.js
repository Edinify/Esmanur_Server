import logger from "../config/logger.js";
import { Admin } from "../models/adminModel.js";
import { Branch } from "../models/branchModel.js";

// Get branches
export const getBranches = async (req, res) => {
  const { id, role } = req.user;
  try {
    const filter = {};

    if (role === "admin") {
      const admin = await Admin.findById(id);
      filter._id = admin.branch;
    }

    const branches = await Branch.find(filter);

    res.status(200).json(branches);
  } catch (err) {
    logger.error({
      method: "GET",
      status: 500,
      message: err.message,
      for: "GET BRANCHES",
      user: req.user,
      functionName: getBranches.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Create branch
export const createBranch = async (req, res) => {
  const { name } = req.body;

  try {
    const existingBranch = await Branch.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (existingBranch) {
      return res.status(409).json({ key: "branch-already-exists" });
    }

    const newBranch = new Branch(req.body);
    await newBranch.save();

    res.status(201).json(newBranch);
  } catch (err) {
    logger.error({
      method: "CREATE",
      status: 500,
      message: err.message,
      for: "CREATE BRANCH",
      user: req.user,
      postedData: req.body,
      functionName: createBranch.name,
    });
    res.status(500).json({ error: err.message });
  }
};

// Update branch
export const updateBranch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const existingBranch = await Branch.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (existingBranch) {
      return res.status(409).json({ key: "branch-already-exists" });
    }

    const updatedBranch = await Branch.findByIdAndUpdate(id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    if (!updatedBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.status(200).json(updatedBranch);
  } catch (err) {
    logger.error({
      method: "PATCH",
      status: 500,
      message: err.message,
      for: "UPDATE BRANCH",
      user: req.user,
      updatedData: req.body,
      functionName: updateBranch.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};

// Delete branch
export const deleteBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBranch = await Branch.findByIdAndDelete(id);

    if (!deletedBranch) {
      return res.status(404).json({ message: "branch not found" });
    }

    res.status(200).json(deletedBranch);
  } catch (err) {
    logger.error({
      method: "DELETE",
      status: 500,
      message: err.message,
      for: "DELETE BRANCH",
      user: req.user,
      functionName: deleteBranch.name,
    });
    res.status(500).json({ message: { error: err.message } });
  }
};
