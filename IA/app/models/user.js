
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore')
  , authTypes = ['github', 'twitter', 'facebook', 'google']

/**
 * User Schema
 */

var UserSchema = new Schema({
    fullname: String,
    email: String,
    createdAt:   {type : Date, default : Date.now},

    // Un supra admin no se puede eliminar de la BD, solo existirá uno
    isSupraAdmin: {type: Boolean, default: false},
    isSuperAdmin: {type: Boolean, default: false},
    isStaff:      {type: Boolean, default: false},
    isActive:     {type: Boolean, default: true},

    provider: String,
    hashed_password: String,
    salt: String,

    authToken: String,
    facebook: {},
    twitter: {},
    github: {},
    google: {}
})

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('fullname').validate(function (name) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  return name.length
}, 'El nombre no puede ser vacío')

UserSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  return email.length
}, 'El email no puede ser vacío')

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User')
  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(err || users.length === 0)
    })
  } else fn(true)
}, 'El correo ingresado ya existe')

UserSchema.path('hashed_password').validate(function (hashed_password) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  return hashed_password.length
}, 'El password no puede ser vacío')


/*
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password)
    && authTypes.indexOf(this.provider) === -1)
    next(new Error('Password inválido'))
  else
    next()
})

/*
 * Post-save hook
 */

UserSchema.post('save', function (user) {

})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  }

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  , makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  , encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
      return ''
    }
  }

  , gravatar: function (size) {
        var baseUrl = 'http://www.gravatar.com/avatar/'
          , query = '/s=' + size
        return baseUrl + crypto.createHash('md5').update(this.email.toLowerCase()).digest('hex') + query;
  }
}

UserSchema.statics = {

  /**
   //* Find user by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
    .exec(cb)
  },

  /**
   //* List users
   *
   * @param {Object} options
   * @param {Function} cb
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('User', UserSchema)
