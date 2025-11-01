const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const Contact = require("../models/contact-model");
const Service = require("../models/services-model");

// ✅ Register
const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hash_password,
      phone,
    });

    res.status(200).json({
      msg: "registration successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// ✅ Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = await userExist.generateToken();

    res.status(200).json({
      msg: "login success",
      token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// ✅ Contact
const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newContact = await Contact.create({
      username,
      email,
      message,
    });

    res.status(200).json({ msg: "Message received", contact: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// ✅ Get logged-in user
const user = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("User Controller Error:", error);
    return res.status(500).json({ msg: "Server error." });
  }
};

// ✅ Fetch all services (public or admin)
const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No services found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error fetching services" });
  }
};

// ✅ Get all users (admin)
const getallusers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error fetching users" });
  }
};

// ✅ Get all contacts (admin)
const getallcontacts = async (req, res) => {
  try {
    const response = await Contact.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No contacts found" });
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error fetching contacts" });
  }
};

// ✅ Get all services (admin)
const getallservices = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ msg: "No services found" });
    }
    return res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error fetching services" });
  }
};

// ✅ Delete user
const delUbyId = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "deleted user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting user" });
  }
};

// ✅ Delete contact
const delCbyId = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ msg: "deleted message" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting message" });
  }
};

// ✅ Delete service
const delSbyId = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.deleteOne({ _id: id });
    res.status(200).json({ msg: "deleted service" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting service" });
  }
};

const getallubyID = async (req, res) => {
  try {
    const id=req.params.id;
    const data=await User.findOne({_id:id},{password:0});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};


const upubyID = async (req, res) => {
  try {
    const id=req.params.id;
    const data=req.body;
     const user=await User.updateOne({_id:id},{
      $set:data,
     });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getallsbyID = async (req, res) => {
  try {
    const id=req.params.id;
    const data=await Service.findOne({_id:id});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const upsbyID = async (req, res) => {
  try {
    const id=req.params.id;
    const data=req.body;
     const user=await Service.updateOne({_id:id},{
      $set:data,
     });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};





module.exports = {
  register,
  login,
  contact,
  user,
  services,
  getallusers,
  getallcontacts,
  getallservices,
  delUbyId,
  delCbyId,
  delSbyId,
  getallubyID,
  upubyID,
  upsbyID,
  getallsbyID
};
