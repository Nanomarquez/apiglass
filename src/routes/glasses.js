const { Router } = require("express");
const router = Router();
const {Glasses} = require('../db.js')

async function getGlass(req, res, next) {
  const { id } = req.params;
  if(!id){
    return res.status(404).json({ message: 'Cannot find glass' });
  }
  try {
    const glass = await Glasses.findByPk(id);
    if (glass == null) {
      return res.status(404).json({ message: 'Cannot find glass' });
    }
    res.glass = glass;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

router.get('/', async (req, res) => {
  try {
    const glasses = await Glasses.findAll();
    res.json(glasses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getGlass, (req, res) => {
  res.json(res.glass)
});

router.put('/:id', getGlass, async (req, res) => {
  const { id } = req.params
  const { name , brand , model , color , sizes , price , imageOne , imageTwo , imageThree , description} = req.body
  try {
    await res.glass.update({
      name,
      price,
      brand,
      model,
      color,
      sizes,
      imageOne,
      imageTwo,
      imageThree,
      description
    },{
      where:{id}
    });
    res.json(res.glass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name , brand , model , color , sizes , price , imageOne , imageTwo , imageThree , description} = req.body
  try {
    const newGlass = await Glasses.create({
      name,
      brand,
      model,
      color: color ? color : null,
      sizes: sizes ? sizes : null,
      price,
      imageOne,
      imageTwo: imageTwo ? imageTwo : null,
      imageThree : imageThree ? imageThree : null,
      description: description ? description : null
    });
    res.status(201).json(newGlass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;