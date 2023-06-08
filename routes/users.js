const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
  getCurrentUser,
} = require('../controllers/users');

const {
  userIdValidator,
  userInfoValidator,
  userAvatarValidator,
} = require('../middlewares/validation');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', userIdValidator, getUserById);
userRouter.patch('/users/me', userInfoValidator, updateUserProfile);
userRouter.patch('/users/me/avatar', userAvatarValidator, updateUserAvatar);

module.exports = userRouter;
