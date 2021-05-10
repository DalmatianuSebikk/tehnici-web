const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Request pentru pagina principala. Returnez index.ejs');
  res.render('index.ejs');
});


module.exports = router;