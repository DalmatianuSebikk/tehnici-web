const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const ipMiddleware = function(req, res, next) {
  const clientIp = requestIp.getClientIp(req); 
  next();
};

function alegRandom(){
  arrayNumarPoze = [9, 12];
  var nrRandom = Math.floor((Math.random() * 10) % 2); // dintre 0 si 1
  return arrayNumarPoze[nrRandom];
}

function alegImagini() {
  var numarPoze = alegRandom();
  var textFisier = fs.readFileSync('assets/galerie.json');
  var jsonParsat = JSON.parse(textFisier);
  var caleGalerie = 'assets/' + jsonParsat.cale_galerie;
  let arrayImagini = [];

  for(let imagini of jsonParsat.imagini){
    let imagine = path.posix.join(caleGalerie, imagini.cale_fisier);
    let extensie = path.extname(imagini.cale_fisier);
    let numeFisier = path.basename(imagini.cale_fisier, extensie);
    
    arrayImagini.push({mare: imagine, descriere: imagini.text_descriere});
  }

  return arrayImagini;
}

function verificareImagini(){
  var data = new Date();
  var numar_luna = data.getMonth();
  var textFisier = fs.readFileSync('assets/galerie.json');
  var jsonParsat = JSON.parse(textFisier); // l-am transformat in obiect;

  var caleGalerie = 'assets/' + jsonParsat.cale_galerie;
  let arrayImagini = [];

  for(let imagini of jsonParsat.imagini){
      let imagine = path.posix.join(caleGalerie, imagini.cale_fisier);
      console.log(imagine);
      let extensie = path.extname(imagini.cale_fisier);
      let numeFisier = path.basename(imagini.cale_fisier,extensie);
      let imagineNoua = path.posix.join(caleGalerie + '/mic/' + numeFisier + '-mic' + '.jpg'); // creez imaginea noua

      if(!fs.existsSync(imagineNoua)){
        sharp(imagine).resize(150).toFile(imagineNoua, function(err){
            if(err){
                console.log("eroare de conversie:", imagine, "->", imagineNoua);
            }
        });
    }

      if(imagini.luni.indexOf(numar_luna) >= 0){
          arrayImagini.push({mare: imagine, mic: imagineNoua, descriere: imagini.text_descriere});
      } 
  }
  console.log(arrayImagini);
  return arrayImagini;
}

router.use(requestIp.mw());
// router.use(function(req, res){
  // const ip = req.clientIp;
//   res.end(ip);
// });



router.get(['/', '/index'], (req, res) => {
  var imagini = verificareImagini();
  if(imagini.length > 6 && imagini.length < 12){
    while(imagini.length != 6){
      imagini.pop();
    }
  }
  const ip = req.clientIp;
  console.log('Request pentru pagina principala. Returnez index.ejs');
  res.render('pagini/index.ejs', {ip: ip, imagini:imagini, n: imagini.length});
});

// router.get('/index', (req, res) => {
//   const ip = req.clientIp;
//   console.log('Request pentru pagina principala. Returnez index.ejs');
//   res.render('pagini/index.ejs', {ip: ip, imagini:verificareImagini()});
// });

router.get('/investigatii', (req, res) => {
  console.log('Request pentru pagina de investigatii. Returnez investigatii.ejs');
  res.render('pagini/investigatii.ejs');
});


router.get('/departamente', (req, res) => {
  console.log('Request pentru pagina de departamente. Returnez departamente.ejs');
  res.render('pagini/departamente.ejs', {imagini:alegImagini()});
})

module.exports = router;