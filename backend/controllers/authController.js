const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
    console.log("REQUEST BODY:", req.body);
    const body = req.body || {};
    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const password = (body.password || "").trim();
    const profileImageUrl = body.profileImageUrl || "";


    if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User - implement this next
exports.loginUser = async (req, res) => {
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid credentials" });
        }
        res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id),
    });
    } catch (err){
        res
            .status(500)
            .json({message: "Error registering user" , error: err.message});
    }
    
};

// Get User Info - implement this later
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json(user);
    } catch (err){
        res
            .status(500)
            .json({message: "Error registering user" , error: err.message});
    }
};
