const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Needed for Render/Railway

app.use(cors());
app.use(express.json());
app.use('/api', teamRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
