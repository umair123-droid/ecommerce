const router = require('express').Router()
const checkOutCtrl = require('../controllers/checkoutCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/check-out')
    .post(auth,checkOutCtrl.getOrders )
    // .post(auth, paymentCtrl.createPayment)


module.exports = router
