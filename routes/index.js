const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const {Client} = require('pg');
const ipMiddleware = function(req, res, next) {
  const clientIp = requestIp.getClientIp(req); 
  next();
};

const client = new Client ({
  host: 'postgres://zqyxlbgvfzaxsm:aedb6ad325ed67862de66ce6b00bc3137deb665c3a3e23be1f53517fbde8ae4d@ec2-54-163-97-228.compute-1.amazonaws.com:5432/dec5hmv2ruafet',
  user: 'sebi',
  password: 'parolica1234',
  database: 'investigatii',
  port:5432
});
client.connect();


// ------------ PARTE CU ALES POZE -------------
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
  let conditie = req.query.tip ? "WHERE categorie_analize = '" + req.query.tip + "'" : "";
  console.log('SELECT id_analize, poza_analiza, nume, descriere, categorie_analize, pret FROM analize_medicale' + conditie);
  client.query('SELECT id_analize, poza_analiza, nume, descriere, categorie_analize, pret FROM analize_medicale' + conditie, function(err, rez){
    console.log(err, rez);
    client.query('SELECT UNNEST(ENUM_RANGE( NULL::tipuri_analize)) AS categ', function(err, rezCateg){
      console.log(rezCateg);
      res.render('pagini/investigatii.ejs', {analize: rez.rows, categorii:rezCateg.rows});
    });
  });
});

router.get('/investigatii/:id_analize', function(req, res){
  console.log(req.params);
  const rezultat = client.query('SELECT * FROM analize_medicale WHERE id_analize=' + req.params.id_analize, function(err, rez){
    console.log(rez.rows);
    res.render('pagini/analiza.ejs', {analiza: rez.rows[0]});
  });
});

router.get('/investigatii/categorie/:categorieAnaliza', function(req, res){
  console.log(req.params);
  const rezultat = client.query("SELECT id_analize, poza_analiza, nume, descriere, categorie_analize, pret FROM analize_medicale WHERE categorie_analize = '" + req.params.categorieAnaliza + "'", function(err, rez){
    console.log(rez.rows);
    res.render('pagini/investigatii.ejs', {analize: rez.rows});
  });
});


router.get('/departamente', (req, res) => {
  console.log('Request pentru pagina de departamente. Returnez departamente.ejs');
  res.render('pagini/departamente.ejs', {imagini:alegImagini()});
})


module.exports = router;


