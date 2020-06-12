// routes.js
const express = require('express');
const router = express.Router();
const { check, validationResult, matchedData } = require('express-validator');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/subscribe', (req, res) => {
  res.render('subscribe', {
    data: {},
    errors: {},
  });
});

router.post(
  '/subscribe',
  [
    check('username')
      .isLength({ min: 1 })
      .withMessage('User Name is required')
      .trim(),
    check('email')
      .isEmail()
      .withMessage('Enter a Valid Email Address')
      .bail()
      .trim()
      .normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('subscribe', {
        data: req.body,
        errors: errors.mapped(),
      });
    }

    const data = matchedData(req);
    console.log('Sanitized: ', data);

    req.flash('success', 'Subscritption Successful');
    res.redirect('/');
  }
);
module.exports = router;
