const mongoose = require('mongoose');

// определение схемы проекта
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // название проекта
  description: String, // описание проекта
  startDate: Date, // дата начала проекта
  endDate: Date, // дата окончания проекта
  priority: { type: String, enum: ['Високий', 'Середній', 'Низький'] }, // приоритет проекта
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // список участников проекта
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Список задач в проекте
});

// Экспорт модели проекта
module.exports = mongoose.model('Project', projectSchema);
