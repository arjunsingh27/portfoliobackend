// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FormData = require('./formdata'); // Import the Mongoose model for form data
const Projects = require('./projects'); // Correct import for Projects model
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json()); // Parse JSON bodies

async function conCheck() {
  try {
    // Use environment variable for MongoDB connection string
    await mongoose.connect(
      process.env.MONGODBURI,
      console.log("MongoDB Connected"+process.env.MONGODBURI),
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
  res.json({ message: "Hello Welcome to My Portfolio" });
});

app.get('/projects', async (req, res) => {
  try {
    const projectList = await Projects.find().sort({ id: 1 }); // Use Projects model
    res.json(projectList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/projects', async (req, res) => {
  const { projecttitle, projectdescription, projectimage, url, githubUrl, datecreated, passward } = req.body;
  console.log("Project Form Input:", projecttitle, projectdescription, projectimage, url, githubUrl, datecreated, passward);

  try {
    // Check if passward matches the expected value
    if (passward !== "12345") { // Use the correct password check
      return res.status(403).json({ message: 'Invalid password' });
    }

    // Create a new project instance
    const newProject = new Projects({
      projecttitle,
      projectdescription,
      projectimage,
      url,
      githubUrl,
      datecreated,
      passward, // Assuming you want to save the passward as well
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    // Send a success response
    res.status(201).json(savedProject);
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Failed to add project', error });
  }
});

// Start the server
app.listen(process.env.PORT , () => {
  console.log("Server Started .........at "+ process.env.PORT);
});
