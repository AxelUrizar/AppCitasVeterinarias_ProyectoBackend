const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/usuarios', require('./routes/usuarios'));

app.listen(PORT, () => { console.log(`App corriendo en el puerto: ${PORT}`)})