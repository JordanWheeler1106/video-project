/**
 * Created by UmairAhmed on 5/11/2017.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/human-experience')
    mongoose.connect('mongodb://admin:root@ds151163.mlab.com:51163/thehumexpdevelop')
    .then(function(){
        console.log('connection successful')
    })
    .catch(function(err){
        console.error(err)
    });

//serve static files.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false }));
app.use(bodyParser.json({limit: '10mb'}));

//REST Api.
app.use('/api/users', require('./server/routes/users'));
app.use('/api/nuggets', require('./server/routes/nuggets'));
app.use('/api/folders', require('./server/routes/folders'));
app.use('/api/invites', require('./server/routes/invites'));
app.use('/api/shares', require('./server/routes/shares'));
app.use('/api/quotes', require('./server/routes/quotes'));
app.use('/api/tags', require('./server/routes/tags'));
app.use('/api/prompts', require('./server/routes/prompts'));
app.use('/api/notes/', require('./server/routes/notes'));
app.use('/api/templates/', require('./server/routes/templates'));
app.use('/api/vital-associations', require('./server/routes/vital-associations'));
app.use('/api/vital-awards', require('./server/routes/vital-awards'));
app.use('/api/vital-education', require('./server/routes/vital-education'));
app.use('/api/vital-employment', require('./server/routes/vital-employment'));
app.use('/api/vital-licences', require('./server/routes/vital-licences'));
app.use('/api/vital-military', require('./server/routes/vital-military'));
app.use('/api/vital-personal-info', require('./server/routes/vital-personal-info'));
app.use('/api/vital-places-lived', require('./server/routes/vital-places-lived'));


app.get('/*', function(req, res){
    res.render('index.html')
});

app.set('views',__dirname + '/views');      //template path.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);      //for rendering html file.

var server  = app.listen(8080, function(){
    console.log("We have started our server on port 8080");
});
