// import { authLogin, authRegister } from "../helpers/userHelpers.js";
import User from "../models/userModel.js";
import genToken from "../utils/generateToken.js";

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      genToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("invalid email or password");
    }
  } catch (error) {
    console.log(error);
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("user email already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      genToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  } catch (err) {
    console.log(err);
  }
};
const logOutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " user logout" });
};
export { authUser, registerUser, logOutUser };
