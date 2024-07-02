import handleError from "../error/error.handler.js";
import { CustomError } from "../error/custom.error.js";
import User from "../models/user.model.js";

export const allUsers = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const pageNumber = parseInt(page, 10);
    const totalUsers=await User.find().countDocuments()
    const users = await User.find().populate("friends", "name email").sort({ createdAt: -1 }).skip((pageNumber - 1) * limit);
    const totalPage=Math.ceil(totalUsers/limit)
    res.send({ users: users,total:totalPage });
  } catch (error) {
    handleError(res, error, allUsers);
  }
};

export const getUsers=async(req,res)=>{
    try {
        const users = await User.find().populate("friends", "name email")
        res.send({ users: users });
      } catch (error) {
        handleError(res, error, getUsers);
      }
}

export const findOneUser = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findOne({ _id: id });
    res.send({ user: user });
  } catch (error) {
    handleError(res, error, allUsers);
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, friends } = req.body;
    const existingEmail=await User.findOne({email:email});
    if(existingEmail){
      throw new CustomError("Email already exist!",400)
      return;
    }
    const createUser = new User({
      name,
      email,
      friends,
    });
    const newUser = await createUser.save();
    res.send({ user: newUser });
  } catch (error) {
    handleError(res, error, addUser);
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.query.id;
    const { name, email, friends } = req.body;
    const createUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { name, email, friends } }
    );
    res.send({ user: createUser });
  } catch (error) {
    handleError(res, error, addUser);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    handleError(res, error, addUser);
  }
};
