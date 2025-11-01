const express = require("express");
const router = express.Router();
const {
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
  getallsbyID,
  upsbyID,

  
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminmi = require("../middleware/admin-middleware");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/contact", contact);
router.get("/service", services); // optional public route

// Protected routes
router.get("/user", authMiddleware, user);
router.get("/users", authMiddleware, adminmi, getallusers);
router.get("/contacts", authMiddleware, adminmi, getallcontacts);
router.get("/services", authMiddleware, adminmi, getallservices);
router.get("/users/:id", authMiddleware, adminmi, getallubyID);
router.get("/services/:id", authMiddleware, adminmi, getallsbyID);
router.get("/servicess/:id", authMiddleware, getallsbyID);

// Patch routes
router.patch("/users/update/:id", authMiddleware, adminmi, upubyID);
router.patch("/services/update/:id", authMiddleware, adminmi, upsbyID);

// Delete routes
router.delete("/users/delete/:id", authMiddleware, adminmi, delUbyId);
router.delete("/contacts/delete/:id", authMiddleware, adminmi, delCbyId);
router.delete("/services/delete/:id", authMiddleware, adminmi, delSbyId);

module.exports = router;
