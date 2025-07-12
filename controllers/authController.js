const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash: hash });
  await user.save();

  res.status(201).json({ msg: "Signup successful" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
};
