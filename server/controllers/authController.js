import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const count = await User.countDocuments();
    let user;

    if (count === 0) {
      // First login 
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        password: hashedPassword,
        role: "admin", // First user always admin
      });

      await user.save();

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        message: "First Admin created & logged in",
        token,
      });
    }

    // If DB already has users -> Only Admins can login
    user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Admin logged in successfully",
      token,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
