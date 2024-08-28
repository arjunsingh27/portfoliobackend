const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://arjunsingh27:Test123@cluster0.0t9vaxx.mongodb.net/arjunltd`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

module.exports = { connect };
