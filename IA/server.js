
var express = require('express')
  , fs = require('fs')
  , passport = require('passport')

  , env = process.env.NODE_ENV || 'development'
  , config = require('config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

var app = express();

// development only
if ('development' == env) {
  	app.use(express.errorHandler());
}

// express settings
require('./config/express')(app, config, passport)

// Url's
require('./config/routes')(app, passport, auth)

// Create server
var port = process.env.PORT || 3000
app.listen(port)
console.log('Expresss app started on port '+port)

// expose app
exports = module.exports = app