import User from "../../modules/User.js";
import Group from "../../modules/Group.js";
import jwt from "jsonwebtoken";
import { validateData } from "../validation.js";
import { ObjectId } from "mongodb";
const isAuth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.json({ authError: "Token missing" });
  const tokenRes = jwt.verify(token, process.env.TOKEN_SECRET);
  if (validateData(["_id", "groupname"], tokenRes))
    return res.json({ authError: "Wrong token" });
  const user = await User.findOne({_id: tokenRes._id});
  // console.log(user);
  if (!user) return res.json({ authError: "Wrong entry data" });
  const group = await Group.findOne({
    name: tokenRes.groupname,
    members: { $in: user._id },
  });
  if (!group) return res.json({ authError: "Not member of group" });
  req.user = user;
  req.group = group;
  next();
};
export default isAuth;
