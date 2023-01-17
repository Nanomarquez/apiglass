require("dotenv").config();
const server = require("./src/app.js")
const { conn , Glasses, Brand } = require("./src/db.js");
const bulkGlasses = require('./src/data/glasses.json')
const bulkBrand = require('./src/data/brand.json')
conn.sync({force: true}).then(()=>{
  server.listen(process.env.PORT, async ()=>{
    await Glasses.bulkCreate(bulkGlasses).then(console.log('Se creo la tabla de glasses'))
    await Brand.bulkCreate(bulkBrand).then(console.log('Se creo la tabla de brand'))
    console.log(`Server listening on port ${process.env.PORT}`)
  })
})
