import User from '../models/user'
import {hashPassword,comparePassword} from '../utils/auth'

export const register = async (req, res) => {
  console.log("body ", req.body);
};
