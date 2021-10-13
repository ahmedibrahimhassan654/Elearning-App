import User from '../models/user'
import {hashPassword} from '../utils/auth'

export const register = async (req, res) => {
  console.log("body ", req.body);
};
