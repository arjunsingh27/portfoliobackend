const Blog = require('../models/blogs'); // Ensure the path to the model is correct

exports.blogUpload = async (req, res) => {
  const { title, description, content } = req.body;

  try {
    const newBlog = new Blog({
      title,
      description,
      content,
    });

    await newBlog.save();
    res.status(200).json({ message: 'Blog data received and saved successfully' });
  } catch (error) {
    console.error('Error saving blog data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllBlogs = async (req, res) => {
    try {
        // Fetch all blog documents from the database
        const blogs = await Blog.find();
        
        // Send the array of blogs directly in the response
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error getting all blogs:', error);
        
        // Send an error message if there's an issue
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getOneBlog = async (req, res) => {
    const { id } = req.params;
    console.log('Requested ID:', id);

    // Validate if id is a valid ObjectId
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    try {
      const blog = await Blog.findById(id);

      // Check if blog was found
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Send blog data along with a success message
      res.status(200).json({
        blog,
        message: 'Blog received successfully'
      });
      
    } catch (error) {
      console.error('Error getting blog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

