var express = require ('express');
var exphbs = require ('express-handlebars');
var app = express();
var methodOverride = require('method-override');


var path = require('path');
//add bodyParser for use of GET & POST
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(methodOverride('_method'));


const knex= require('./db/knex');

app.set('port', process.env.PORT || 3000);

app.engine('handlebars', exphbs({defaultLayout:
                                 'main'}));
app.set('view engine','handlebars');
//** REQUERIMIENTOS DE ARCHIVOS ROUTES **
var kusi = require('./routes/kusi');
var index = require('./routes/index');

//**ENRUTAMIENTO**

app.use('/kusi',kusi);

app.use('/',index);




        app.listen(app.get('port'), function(){
            console.log('Express on localhost:' +
                        app.get('port'));
        });





//ARCHIVOS ESTÁTICOS
app.use(express.static(__dirname + '/public'));
