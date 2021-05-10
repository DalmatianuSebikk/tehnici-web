const express = require('express');
const path = require('path');
const routes = require('./routes');
// var engine = require('ejs-mate');
const app = express(); // declar obiectul
// Setez documentul default de views ca fiind drept folderul views
app.set('views', path.join(__dirname, 'views')); // folosesc app.set pentru asta

// setez folderele pentru SASS si js
app.set(express.static(path.join(__dirname, "css")));
app.set(express.static(path.join(__dirname, 'node_modules')));
app.set(express.static(path.join(__dirname, 'js')));

// setez view-engine ul la ejs
app.set('view engine', 'ejs');
// app.engine('ejs', engine);
// fac rutele
app.use('/', routes);

app.listen(8080, () => {console.log("Serverul a pornit...")});