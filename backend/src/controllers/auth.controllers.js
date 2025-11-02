import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            email,
            password: hashedPassword
        })
        if (!newUser) {
            return res.status(400).json({
                message: "Invalid user data"
            })
        }
        generateToken(newUser._id, res)
        await newUser.save()

        return res.status(201).json({
            _id: newUser._id,
            email: newUser.email
        })
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token & set cookie
    generateToken(user._id, res);

    // Successful response
    res.status(200).json({
      _id: user._id,
      email: user.email,
    });

  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" }); // ✅ fixed
  }
};
