const mongoose = require('mongoose');

// определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // имя пользователя
  email: { type: String, required: true, unique: true }, // электронная почта
  password: { type: String, required: true }, // пароль 
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] // ссылки на проекты  в которых участвует пользователь
});

// Экспорт модели пользователя
module.exports = mongoose.model('User', userSchema);
