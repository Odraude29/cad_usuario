
/**
 * Module dependencies.
 */

var express = require('express');
  //, routes = require('./routes');
var load = require('express-load');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/waibtec', function(err){
  if(err){
    console.log('Erro ao conectar no mongodb: '+err);
  }
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(express.json());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);
//app.get('/teste', routes.teste);

load('models').then('controllers').then('routes').into(app);


//var db = mongoose.connect;
/*
var kittySchema = mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({name: 'Silence'})

silence.save(function(err, fluffy){
  if (err) return console.error(err);
  console.log('salvo com sucesso');
});
*/

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
