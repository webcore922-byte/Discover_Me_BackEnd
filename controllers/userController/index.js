const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const getMe = require('./getMe');
const updateUser = require('./updateUser');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getMe,
  updateUser,
  forgotPassword,
  resetPassword
};
