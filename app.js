const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}))
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Bienvenido!')
});

app.use('/usuarios', require('./routes/usuarios'));
app.use('/mascotas', require('./routes/mascotas'));
app.use('/citas', require('./routes/citas'))

app.listen(PORT, () => { console.log(`App corriendo en el puerto: ${PORT}`)})