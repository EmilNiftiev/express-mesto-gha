const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.patch('/users/me', updateUserProfile);

module.exports = userRouter;
