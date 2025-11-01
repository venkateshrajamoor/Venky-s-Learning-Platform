const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    technology: {
      type: String,
      required: [true, "Technology name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    service: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    provider: {
      type: String,
      required: [true, "Provider name is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
