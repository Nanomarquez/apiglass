const { Router } = require("express");
const router = Router();
const { Users } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AUTH_EXPIRES, AUTH_ROUNDS, AUTH_SECRET } = process.env;




router.get("/all", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, address, password , phone_number } =
    req.body;
  if(!first_name || !last_name || !email || !phone_number || !password || !address){
    res.status(403).send({message: "Something went wrong"})
  }
  try {
    const encrypted_password = bcrypt.hashSync(password, +AUTH_ROUNDS)
    Users.findOrCreate({
      where:{first_name,last_name,email,address,phone_number,password:encrypted_password}
    }).then(([user,created])=>{
      if(!created){
        res.status(403).send({message: "Something went wrong"})
      }
      let token = jwt.sign({user},AUTH_SECRET,{expiresIn:AUTH_EXPIRES})
      let sanitazedUser = {
        id:user.id,
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        address:user.address,
        phone_number:user.phone_number,
        updatedAt:user.updatedAt,
        createdAt:user.createdAt
      }
      res.send({user:sanitazedUser,token})
    }).catch(err=>res.status(500).send({message:{err:err.message}}))
  } catch (error) {
    res.status(500).send({message:error.message})
  }
});

router.post('/signin', (req, res) => {
  const {password,email} = req.body;
  if(!password || !email){
    return res.status(403).send({message: "fields required"})
  }
  try {
    Users.findOne({where:{email}}).then(user=>{
      if(!user){
        res.status(404).send({message:"User not found"})
      }else{
        if(bcrypt.compareSync(password,user.password)){
          let token = jwt.sign({user},AUTH_SECRET,{expiresIn: AUTH_EXPIRES})
          let sanitazedUser = {
            id:user.id,
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            address:user.address,
            phone_number:user.phone_number,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt
          }
          res.status(200).send({user:sanitazedUser,token})
        }else{
          res.status(404).send({message:"Wrong password"})
        }
      }
    })
  } catch (error) {
    res.status(500).send({message:error.message})
  }

})
router.put('/:id',(req,res)=>{
  const { id } = req.params
  const { first_name , last_name , email, address, phone_number , password } = req.body
  try {
    Users.findByPk(id).then(user=>{
      if(!user){
        res.status(400).send({message:"User not found"})
      }else{
        if(password){
          user.update({
            first_name:first_name ? first_name : user.first_name,
            last_name:last_name ? last_name : user.last_name,
            email:email ? email : user.email,
            address:address ? address : user.address,
            phone_number:phone_number ? phone_number : user.phone_number,
            password:password ? bcrypt.hashSync(password,+AUTH_ROUNDS) : user.password
          }).then(user=>{res.send({user})}).catch(err=>{res.status(500).send({message})})
        }else{
          user.update({
            first_name:first_name ? first_name : user.first_name,
            last_name:last_name ? last_name : user.last_name,
            email:email ? email : user.email,
            address:address ? address : user.address,
            phone_number:phone_number ? phone_number : user.phone_number,
          }).then(user=>{res.send({user})}).catch(err=>{res.status(500).send({message})})
        }
      }
    })
  } catch (error) {
    res.status(400).send({message:error.message})
  }
})


module.exports = router;
