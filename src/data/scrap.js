const cheerio = require('cheerio');
const request = require('request');

const url = 'https://opticassociales.com.ar/categoria-producto/lentes-para-sol/armani-exchange-lentes-para-sol/';
const products = []
request(url, (error, response, html) => {
  const $ = cheerio.load(html);
  const productList = $('.woocommerce-loop-image-link')
  productList.map((index,element)=>{
    const link = $(element).attr('href');
    request(link,(error,response,html)=>{
      const $ = cheerio.load(html);
      const productList = $('.zoom')
      const productBrand = $('.single-product-category').text()
      const productName = $('.product_title').text()
      const productPriceDiscount = $("bdi").text().split('').slice(10,16).join('')
      const productPriceOutDiscount = $("bdi").text().split('').slice(2,8).join('')
      productList.map((index,element)=>{
        const image = $(element).children('img').attr('src')
      })
    })
  })
});