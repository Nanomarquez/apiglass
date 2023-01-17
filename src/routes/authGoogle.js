
const { Router } = require("express");
const router = Router();
const { Users } = require("../db");
const jwt = require("jsonwebtoken");
const {AUTH_SECRET,AUTH_EXPIRES} = process.env
router.get('/auth',(req,res)=>{
  Users.findOrCreate({where:{email:req.user.emails[0].value,first_name:req.user.name.givenName,last_name:req.user.name.familyName}}).then(([user,created])=>{
    let token = jwt.sign({user},AUTH_SECRET,{expiresIn:AUTH_EXPIRES})
    res.send({user:user,token:token})
  }).catch(err=>res.status(500).send(err.message))
})


module.exports = router;
