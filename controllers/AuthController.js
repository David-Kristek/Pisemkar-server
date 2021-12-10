import User from "../modules/User";
import Group from "../modules/Group";
import jwt from "jsonwebtoken";
import { validateData } from "../lib/validation";
import { sendEmail } from "../lib/email";
import {
  landingPageLogin,
  landingPageRegister,
  loginEmail,
  registerEmail,
} from "../lib/html/templates";
import fetcher from "node-fetch";
import getCalendarData from "../lib/bakalariformater";

const loginToGroup = async (req, res) => {
  console.log(req.body);
  if (validateData(["username", "email", "groupname", "address"], req.body))
    return res.send("Neplatná data");
  const { username, email, groupname, address } = req.body;
  const group = await Group.findOne({ name: groupname });
  console.log(groupname);
  if (!group) return res.json({ groupname: "Tato skupina neexistuje" });
  const user = await User.findOne({ email });
  if (user) {
    const isVerified = await User.findOne({
      _id: user._id,
      verifiedDevices: { $in: address },
    });
    if (isVerified) {
      const token = jwt.sign(
        { _id: user._id, groupname },
        process.env.TOKEN_SECRET
      );
      return res.json({ token, user });
    }
  } else {
    const newUser = new User({
      username,
      email,
    });
    await newUser.save();
  }
  const token = jwt.sign(
    { email, address, groupname },
    process.env.TOKEN_SECRET
  );
  const emailSending = loginEmail(token, groupname);
  sendEmail(email, emailSending.subject, emailSending.html);
  return res.json({ waitForVerify: true });
};

const createGroup = async (req, res) => {
  if (
    validateData(
      [
        "username",
        "email",
        "groupname",
        "bakalariusername",
        "bakalaripassword",
        "address",
      ],
      req.body
    )
  )
    return res.send("Neplatná data");
  const {
    username,
    email,
    groupname,
    bakalariusername,
    bakalaripassword,
    address,
  } = req.body;
  const group = await Group.findOne({ name: groupname });
  if (group) return res.json({ groupname: "Tato skupina již existuje" });
  // ověření údajů do bakalářů
  const body = new URLSearchParams();
  body.append("client_id", "ANDR");
  body.append("grant_type", "password");
  body.append("username", bakalariusername);
  body.append("password", bakalaripassword);
  var refreshBakalariToken;
  var bakalariToken;
  try {
    const bakalariLogin = await fetcher("https://bakalari.gymjh.cz/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    const data = await bakalariLogin.json();
    if (data.error) {
      return res.json({ bakalariError: "Neplatné údaje do bakalařů" });
    } else if (data.refresh_token) {
      refreshBakalariToken = data.refresh_token;
      bakalariToken = data.access_token;
    } else return res.json({ bakalariError: "Neplatné údaje do bakalařů" });
  } catch (err) {
    console.log(err);
    return res.json({ bakalariError: "Neplatné údaje do bakalařů" });
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    const isVerified = await User.findOne({
      _id: user._id,
      verifiedDevices: { $in: address },
    });
    if (isVerified) {
      const token = jwt.sign(
        { _id: user._id, groupname },
        process.env.TOKEN_SECRET
      );
      const calendarData = await getCalendarData(bakalariToken);
      const newGroup = new Group({
        name: groupname,
        refreshBakalariToken,
        members: [user._id],
        createdByUser: user._id,
        calendarData,
      });
      await newGroup.save();

      return res.json({ token, user });
    }
  } else {
    const newUser = new User({
      username,
      email,
    });
    await newUser.save();
  }
  const token = jwt.sign(
    {
      email,
      address,
      groupname,
    },
    process.env.TOKEN_SECRET
  );
  const emailData = registerEmail(token, groupname);
  sendEmail(email, emailData.subject, emailData.html);
  return res.json({ waitForVerify: true });
};

const loginEmailVerification = async (req, res) => {
  if (validateData(["token"], req.query)) return res.send("Neplatná data");
  const { email, address, groupname } = jwt.verify(
    req.query.token,
    process.env.TOKEN_SECRET
  );
  const user = await User.findOne({ email });
  if (!user) return res.send("Uživatel nenalezen");
  await User.updateOne(
    { _id: user._id },
    { $addToSet: { verifiedDevices: address } }
  );

  await Group.updateOne(
    { name: groupname },
    { $addToSet: { members: user._id } }
  );
  // socket send to device user, token
  return res.send(landingPageLogin(user, groupname));
};
const createGroupEmailVerification = async (req, res) => {
  if (validateData(["token"], req.query)) return res.send("Neplatná data");
  const { email, address, groupname } = jwt.verify(
    req.query.token,
    process.env.TOKEN_SECRET
  );
  if (
    validateData(["email", "address", "groupname"], {
      email,
      address,
      groupname,
    })
  )
    return res.send("Neplatný token");
  var user = await User.findOne({ email });
  const groupAL = await Group.findOne({ name: groupname });
  if (groupAL) return res.send(landingPageRegister(user, groupname));
  if (user) {
    await User.updateOne(
      { _id: user._id },
      { $addToSet: { verifiedDevices: address } }
    );
  } else res.send("Neplatný token");
  return res.send(landingPageRegister(user, groupname));
};

export {
  loginToGroup,
  createGroup,
  loginEmailVerification,
  createGroupEmailVerification,
};
