const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    if (error instanceof mongoose.MongooseError) {
      console.error("Error connecting to MongoDB");
    } else {
      console.error("An unexpected error occurred:");
    }
  }
};
