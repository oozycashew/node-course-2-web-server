const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware - 'Express you usually work like this, however work like this for now'


// next is for when middleware is done.
app.use((req, resp, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

// app.use((req, resp, next) => {
//   resp.render('maintenance.hbs');
// });

// Tell express to read from a static directory
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Root Route
app.get('/', (req, resp) => {
  // resp.send('<h1>Hello Express!</h1>');
  // resp.send({
  //   name: 'Ray',
  //   likes: [
  //     'Powerlifting',
  //     'Gaming'
  //   ]
  // });
  resp.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!'
  });
});

// About Route
app.get('/about', (req, resp) => {
  // resp.send('About Page');
  resp.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// Projects Route
app.get('/projects', (req, resp) => {
  resp.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

// Bad Route
app.get('/bad', (req, resp) => {
  resp.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
