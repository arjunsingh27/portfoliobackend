const express = require('express');
const cors = require('cors');
const { jsonParser } = require('./middlewares/bodyParser');
const database = require('./config/database');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const indexRoutes = require('./routes/index');
const blogsRoutes = require('./routes/blogs');

const app = express();
app.use(cors());

// Middleware to parse JSON data
app.use(jsonParser);

// Connect to MongoDB
database.connect();

// Routes
app.use('/', indexRoutes);
app.use('/contact', contactRoutes);
app.use('/projects', projectRoutes);
app.use('/blogs',blogsRoutes);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server Started ..........');
});
