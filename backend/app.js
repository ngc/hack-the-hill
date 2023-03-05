const express = require('express');
const multer = require('multer');
// const { detectColors } = require('./detectFuncs');
import detectObjects from './index-base64';
import { colorsArr } from './index-base64';

const app = express();
const upload = multer();

// Define an endpoint for uploading images and detecting colors
app.post('/detectColors', upload.single('image'), async (req, res) => {
  try {

    const { buffer } = req.file;
    const colors = await detectObjects(buffer);
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
