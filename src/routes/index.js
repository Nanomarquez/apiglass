const { Router } = require("express");

const router = Router();
const passport = require('../middleware/google')
const glassesRouter = require('./glasses')
const authRouter = require('./auth')
const brandRouter = require('./brand')
const authGoogle = require('./authGoogle')
router.use('/glasses',glassesRouter)
router.use('/auth',authRouter)
router.use('/brand',brandRouter)
router.use('/google',passport.authenticate('auth-google',{
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
  session:false
}),authGoogle)
router.use("/", (req, res) => {
  res.send("Welcome to glasses api");
});

module.exports = router;