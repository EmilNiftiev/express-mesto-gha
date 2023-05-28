const userRouter = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.patch('/users/me', updateUserProfile);

module.exports = userRouter;
