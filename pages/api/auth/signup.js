import User from "@/models/User";
import { hashPass } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "error in connecting to DB" });
  }

  //از ریکوئستی که به ما میاد، ایمیل و پسورد رو میگیریم
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "invalid data" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "this email is being used!" });
  }

  const hashedPassword = await hashPass(password);

  const newUser = await User.create({
    email: email,
    password: hashedPassword,
  });
  console.log(newUser);
  res.status(201).json({ status: "success", message: "user created" });
}
