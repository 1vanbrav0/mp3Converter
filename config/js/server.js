const express = require('express'); //declaration of constants
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
let router = require('../routes/index');

app.use(bodyParser.urlencoded({
  extended: true
})); //use of bodyparser for post request
app.use(bodyParser.json());

i18n.configure({ //configuration of i18n to get traductions
  locales: ['es', 'en', 'pt'],
  defaultLocale: 'es',
  cookie: 'locale',
  directory: path.join(__dirname, '../languages'),
  updateFiles: false
})

app.use(cookieParser()); //use of cookieparser for cookies
app.use(i18n.init); //use of i18n for traductions
app.use((req, res, next) => { //set cookie of language
  if (req.cookies.locale === undefined) {
    res.cookie('locale', 'es', {
      maxAge: 900000,
      httpOnly: true
    });
    req.setLocale('es');
  } else if (req.cookies.locale === "es") {
    req.setLocale('es');
  } else if (req.cookies.locale === "en") {
    req.setLocale('en');
  } else {
    req.setLocale('pt');
  }
  next();
});

app.use(router); // use router middleware
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../../views'));
app.listen(5000); //server deploy