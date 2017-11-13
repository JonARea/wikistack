const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const models = require('./models')
const routes = require('./routes')
const path = require('path');

app.use(morgan('dev'))

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
    noCache: true
});

models.Page.sync();
models.User.sync();


app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')));
//app.get('/', (req, res) => res.send('hi there'))
app.use('/', routes);
app.listen(3000, () => console.log('running on port 3000'))