const FormData = require('../models/formdata');

exports.submitContactForm = async (req, res) => {
  const formData = req.body;

  try {
    const newFormData = new FormData({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    await newFormData.save();
    res.status(200).json({ message: 'Form data received and saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
