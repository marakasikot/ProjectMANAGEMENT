const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Invitation = require('../models/Invitation');

// поиск пользователей (упрощенный)
router.get('/search-users', async (req, res) => {
  const { username } = req.query;
  try {
    const users = await User.find({ username: new RegExp(username, 'i') });
    res.json(users);
  } catch (error) {
    res.status(500).send('Error searching for users');
  }
});

// отправка приглашений (упрощенный)
router.post('/invite-user', async (req, res) => {
  const { userId, projectId } = req.body;
  try {
    const invitation = new Invitation({ userId, projectId });
    await invitation.save();
    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).send('Error sending invitation');
  }
});

// управление приглашениями (упрощенный)
router.post('/respond-invitation', async (req, res) => {
  const { invitationId, accept } = req.body;
  try {
    if (accept) {
      // Логика принятия приглашения
    }
    await Invitation.deleteOne({ _id: invitationId });
    res.status(200).send('Invitation response recorded');
  } catch (error) {
    res.status(500).send('Error responding to invitation');
  }
});

// регистрация нового пользователя (упрощенный)
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered', userId: user._id });
});

// вход пользователя (упрощенный)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  res.json({ message: 'User authenticated', token: 'your_generated_token_here' });
});

// получение проектов пользователя (упрощенный)
router.get('/users/:userId/projects', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('projects');
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user.projects);
});

module.exports = router;
