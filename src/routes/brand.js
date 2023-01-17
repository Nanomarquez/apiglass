const { Router } = require("express");
const router = Router();
const {Brand} = require('../db.js')

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;