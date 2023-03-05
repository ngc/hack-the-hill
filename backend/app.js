const express = require('express');
const multer = require('multer');
const { detectColors } = require('./detectFuncs');

const app = express();
const upload = multer();

// Define an endpoint for uploading images and detecting colors
app.post('/detectColors', upload.single('image'), async (req, res) => {
  try {
    // console.log("request is ")
    // console.log(req.file)
    const { buffer } = req.file;
    const colors = await detectColors(buffer);
    res.json(colors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
