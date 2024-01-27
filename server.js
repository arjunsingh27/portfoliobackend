// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const FormData = require('./formdata'); // Import the Mongoose model
const projects = require('./projects');
 
const app = express();
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

async function conCheck() {
  try {
    // Use environment variable for the password
     
    await mongoose.connect(
      `mongodb+srv://arjunsingh27:Test123@cluster0.0t9vaxx.mongodb.net/arjunltd`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

conCheck();

// Route to handle the contact form submission
app.post('/contact', async (req, res) => {
  const formData = req.body; // Assuming the form data is sent as JSON
  console.log(formData);

  try {
    // Create a new instance of the FormData model
    const newFormData = new FormData({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    // Save the form data to MongoDB
    await newFormData.save();

    res.status(200).json({ message: 'Form data received and saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: "Hello Welcome to the My PortFolio" });
});

app.get('/projects', async (req, res) => {
  try {
    const projectList = await projects.find().sort({ id: 1 });
    res.json(projectList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(process.env.PORT || 4000,function(req,res){
  console.log("Server Started .........");
})
