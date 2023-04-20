const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const URI = 'mongodb+srv://nhat:F0zwwyPdfQ9lumQw@cluster0.gmbddls.mongodb.net/upload-download';

const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '.png');
  }
});

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: storage }).array('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

const imageRoutes = require('./routes/image');
app.use('/images', imageRoutes);

const PORT = 5000;
mongoose.connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server Listening on port ' + PORT);
    });
  })
  .catch(err => console.log(err));