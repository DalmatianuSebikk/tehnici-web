const express = require('express');
const path = require('path');
const routes = require('./routes');

// var engine = require('ejs-mate');
const app = express(); // declar obiectul
// Setez documentul default de views ca fiind drept folderul views
app.set('views', path.join(__dirname, 'views')); // folosesc app.set pentru asta

// setez folderele pentru SASS si js
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "css")));
app.set(express.static(path.join(__dirname, 'node_modules')));
app.set(express.static(path.join(__dirname, 'js')));

// fac rutele, ip ul si o functie de aruncat 404 not found:

app.use('/', routes);
app.use(function(req, res) {
    res.status(404);
    res.render('pagini/eroare');
});

// setez view-engine ul la ejs
app.set('view engine', 'ejs');
// app.engine('ejs', engine);

app.listen(8080, () => {console.log("Serverul a pornit...")});