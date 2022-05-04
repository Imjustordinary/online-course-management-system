const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/user-controller');
const fileUpload = require('../middleware/file-upload');
const { route } = require('./cus-route');

const router = express.Router();

// router.get('/', usersController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signupUser
);

router.post('/login', usersController.loginUser);

router.get('/', usersController.getUsers)

router.get('/control/:uid', usersController.controlUser)

router.get('/:uid',usersController.getUser)

router.patch('/:uid',usersController.updateUser)

module.exports = router;