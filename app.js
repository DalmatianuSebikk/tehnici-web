const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const sharp = require('sharp');
const {Client} = require('pg');
const { S_IFREG } = require('constants');
// var engine = require('ejs-mate');
const app = express(); // declar obiectul
// Setez documentul default de views ca fiind drept folderul views
app.set('views', path.join(__dirname, 'views')); // folosesc app.set pentru asta






// app.use(express.static(path.join(__dirname, "assets/galerie")));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, "css")));
app.set(express.static(path.join(__dirname, 'node_modules')));


// fac rutele, ip ul si o functie de aruncat 404 not found:

app.use('/assets/galerie.json', (req, res) =>{
    res.status(403);
    res.render('pagini/interzis');
  });

app.use('/assets', express.static(path.join(__dirname, "assets")));
app.use('/', routes);
app.use('/*',function(req, res) {
    res.status(404);
    res.render('pagini/eroare');
});

// setez view-engine ul la ejs
app.set('view engine', 'ejs');
// app.engine('ejs', engine);

app.listen(process.env.PORT, () => {console.log("Serverul a pornit...")});