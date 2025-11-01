const adminmi = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin; 

    if (!isAdmin) {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    // ✅ do NOT send any response here; just continue
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ msg: "Server error in admin middleware" });
  }
};

module.exports = adminmi;
