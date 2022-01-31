const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const stripe=require('stripe')('sk_test_51JblWcDblIGqtWoF2d3SqtjMzn5LZjUkDbzp3iqGznOSh97BqlkJQASluId1OE8J79GV5ZdU3hlWJkAA0Xyh3Wvm00adcUoCpX')
router.route('/payment')
    .get(auth,authAdmin, paymentCtrl.getPayments)
    .post(auth,paymentCtrl.createPayment)


module.exports = router
