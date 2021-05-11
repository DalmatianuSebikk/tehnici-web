const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');

const ipMiddleware = function(req, res, next) {
  const clientIp = requestIp.getClientIp(req); 
  next();
};

router.use(requestIp.mw());
// router.use(function(req, res){
  // const ip = req.clientIp;
//   res.end(ip);
// });

router.get('/', (req, res) => {
  const ip = req.clientIp;
  console.log('Request pentru pagina principala. Returnez index.ejs');
  res.render('pagini/index.ejs', {ip: ip});
});

router.get('/index', (req, res) => {
  console.log('Request pentru pagina principala. Returnez index.ejs');
  res.render('pagini/index.ejs');
});

router.get('/investigatii', (req, res) => {
  console.log('Request pentru pagina de investigatii. Returnez investigatii.ejs');
  res.render('pagini/investigatii.ejs');
});


router.get('/departamente', (req, res) => {
  console.log('Request pentru pagina de departamente. Returnez departamente.ejs');
  res.render('pagini/departamente.ejs');
})

module.exports = router;