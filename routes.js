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
    check('companyName')
      .isLength({ min: 1 })
      .withMessage('Company Name is required')
      .trim(),
    check('email')
      .isEmail()
      .withMessage('Enter a Valid Email Address')
      .bail()
      .trim()
      .normalizeEmail(),

    check('address')
      .isLength({ min: 1 })
      .withMessage('Address is required')
      .trim(),

    check('city').isLength({ min: 1 }).withMessage('City is required').trim(),

    check('state').isLength({ min: 1 }).withMessage('State is required').trim(),

    check('country')
      .isLength({ min: 1 })
      .withMessage('Country is required')
      .trim(),

    check('credCardNum')
      .isLength({ min: 1 })
      .isNumeric()
      .withMessage('Credit Card Number is not Valid')
      .trim(),

    check('expirationDate')
      .isLength({ min: 1 })
      .withMessage('Card Expiration Date is required')
      .trim(),

    check('cvv')
      .isLength({ min: 1 })
      .isNumeric()
      .withMessage('CVV is not Valid')
      .trim(),

    check('nameOnCard')
      .isLength({ min: 1 })
      .isNumeric()
      .withMessage("Card Holder's Name is required")
      .trim(),
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
