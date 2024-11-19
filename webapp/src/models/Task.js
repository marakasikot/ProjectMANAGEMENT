const mongoose = require('mongoose');

// определение схемы задачи
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true }, // название задачи
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] }, // статус выполнения задачи
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // ссылка на проект, к которому относится задача
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Пользователь, ответственный за выполнение задачи
});

// Экспорт модели задачи
module.exports = mongoose.model('Task', taskSchema);
