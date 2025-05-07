const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teamRoutes = require('./routes/teamRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', teamRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => console.error(err));
