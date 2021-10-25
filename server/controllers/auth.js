import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    // console.log(req.body);
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");
    // hash password
    const hashedPassword = await hashPassword(password);
    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//login
export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).send("You are not registered in our web site");
    }
    // console.log(user);
    //check the password
    const mathch = await comparePassword(password, user.password);
    //create signed jwt
    if (mathch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      //return user and tocken without hashed password
      user.password = undefined;

      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, //only work on https
      });
      res.json(user);
    } else {
      return res.status(400).send("password not correct");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//logout
export const logout = async (req, res) => {
  try {
    console.log(req.body);
    res.clearCookie("token");

    return res.json({ message: "signout success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
