/**
 * Resource: element (Element) elements Elements
 * Key: name
 */

var url_base = '/elements'
var templates = {
    'index': 'elements/index.html',
    'new': 'elements/new.html',
    'show': 'elements/show.html',
    'edit': 'elements/edit.html',
    'delete': 'elements/delete.html'
}

/*
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , utils = require('../../lib/utils')
  , Element = mongoose.model('Element')
  , _ = require('underscore')

/**
 * Find element by id
 */
exports.element = function(req, res, next, id){
    Element.load(id, function (err, element) {
        if (err) return next(err)
        if (!element) return next(new Error('Cannot find element ' + id))
        req.element = element
        next()
    })
}

/**
 * List of Elements
 */
exports.index = function(req, res){
    var page = req.param('page') > 0 ? req.param('page') : 0
    var perPage = 15
    var options = {
          perPage: perPage,
          page: page
    }

    Element.list(options, function(err, elements) {
        if (err) return res.render('500')
        
        Element.count().exec(function (err, count) {
                res.render(templates.index, {
                title: 'List of elements',
                //elements: m,
                pagination: utils.pagination(req.url, page, (count / perPage))
            })
        })
    })
}

exports.new = function(req, res){
    res.render(templates.new, {
        title: 'New element',
        element: new Element({})
    })
}
exports.create = function (req, res) {
    var element = new Element(req.body)

    element.save(function (err) {
        if (err) {
            console.log(err)
            res.render(templates.new, {
                title: 'New element',
                element: element,
                errors: err.errors
            })
        }
        else {
            req.flash('success', 'Element has been created')
            res.redirect(url_base + '/' + element._id)
        }
    })
}

exports.edit = function (req, res) {
    res.render(templates.edit, {
        title: 'Edit '+ req.element.name,
        element: req.element
    })
}

exports.update = function(req, res){
    var element = req.element
    element = _.extend(element, req.body)
    
    element.save(function(err) {
        if (err) {
            res.render(templates.edit, {
                title: 'Edit Element',
                element: element,
                errors: err.errors
            })
        }
        else {
            req.flash('success', 'Element has been updated')
            res.redirect(url_base + '/' + element._id)
        }
    })
}

exports.show = function(req, res){

    var page = req.param('page') > 0 ? req.param('page') : 0
    var perPage = 15
    var options = {
          perPage: perPage
        , page: page
        , criteria: {
            'element': req.element._id
        }
    }
    
    res.render(templates.show, {
        title: req.element.name,
        name: req.element.name,
        element: req.element
    })
}

exports.delete = function (req, res) {
    res.render(templates.delete, {
        title: 'Delete ' + req.element.name,
        name: req.element.name,
        element: req.element
    })
}

exports.destroy = function(req, res){
    var element = req.element

    if (req.user.authenticate(req.body.password)) {
        element.remove(function(err){
            if (err) {
                return res.render('500')
            }
            else {
                req.flash('info', 'Element has been deleted')
                res.redirect(url_base)
            }
        })
    }
    else {
        req.flash('error', 'Wrong password')
        res.redirect(url_base + '/' + element._id + '/delete')
    }
}