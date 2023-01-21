const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');


const APIKEY = 'pub_15798d444bdb414bc530a4d99487e01ead5f6';
var category = 'technology,science';
const APIURL = `https://newsdata.io/api/1/news?apikey=${APIKEY}&category=${category}&language=en`;


app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/news', (req, res) => {
  axios.get(APIURL)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});


//post request
app.post('/news', (req, res) => {
  category = req.body.category;
  const APIURL = `https://newsdata.io/api/1/news?apikey=${APIKEY}&category=${category}&language=en`;
  axios.get(APIURL)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });

});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
