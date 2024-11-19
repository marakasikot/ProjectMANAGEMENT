const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Убедитесь, что переменная окружения MONGO_URI правильно установлена
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/project_management';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('Connection error:', err.message);
});

const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
