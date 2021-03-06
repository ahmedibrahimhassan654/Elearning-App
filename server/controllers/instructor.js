import User from "../models/user";
import Course from "../models/course";
const stripe = require("stripe")(process.env.STRIP_SECRET);
import queryString from "query-string";
export const makeInstructor = async (req, res) => {
  try {
    // 1. find user from db
    const user = await User.findById(req.user._id).exec();
    // 2. if user dont have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({ type: "express" });
      //   console.log("ACCOUNT => ", account.id);
      user.stripe_account_id = account.id;
      user.save();
    }
    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });
    //  console.log(accountLink)
    // 4. pre-fill any info such as email (optional), then send url resposne to frontend
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });
    // 5. then send the account link as response to fronend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR ", err);
  }
};
export const getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    console.log("account", account.charges_enabled);
    if (!account.charges_enabled) {
      return res.status(401).send("unauthorized to be able charge");
    } else {
      const statusUpdate = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "Instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec();

      res.json(statusUpdate);
    }
  } catch (err) {
    console.log(err);
  }
};
export const getCurrentInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    console.log("CURRENT_USER", user);
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    }
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    // console.log("instructor courses", courses);
    res.json({ num: courses.length, data: courses });
  } catch (err) {
    console.log(err);
  }
};
