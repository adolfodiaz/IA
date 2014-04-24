/**
 * Resource: element (Element)
 * Key: name
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')

/**
 * Element Schema
 */

var ElementSchema = new Schema({
    name:        {type : String, default : '', trim : true},
    description: {type : String, default : '', trim : true},
    createdAt:   {type : Date, default : Date.now}
})

/**
 * Validations
 */

// Blank

ElementSchema.path('name').validate(function (e) {
  return e.length > 0
}, 'Name is required')


/**
 * Pre-remove hook
 */

ElementSchema.pre('remove', function (next) {
  
    next()
})

ElementSchema.post('save', function (element) {
    
})

ElementSchema.post('remove', function (element) {

})

/**
 * Methods
 */

ElementSchema.methods = {
    
}

/**
 * Statics
 */

ElementSchema.statics = {

  /**
   * Find element by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      //.populate('user', 'name email')
      //.populate('comments.user')
      .exec(cb)
  },

  /**
   * List elements
   *
   * @param {Object} options
   * @param {Function} cb
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      //.populate('user', 'name')
      // .sort({'name': 1})
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Element', ElementSchema)
