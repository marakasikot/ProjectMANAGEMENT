const mongoose = require('mongoose');

// определение схемы приглашения для проекта
const invitationSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // ссылка на проект
  invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // приглашенный пользователь
  inviter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // пользователь, отправивший приглашение
  status: { type: String, enum: ['Pending', 'Accepted', 'Declined'] } // статус приглашения
});

// экспорт модели для использования в других частях приложения
module.exports = mongoose.model('Invitation', invitationSchema);
