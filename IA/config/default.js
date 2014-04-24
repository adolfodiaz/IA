/*
 * Configuración del proyecto
 */
var path = require('path')
  , root_path = path.normalize(__dirname + '/..')
  
  , media_path = root_path + '/public/media'
  , attachments_path = media_path + '/attachments'
  , images_path = media_path + '/images'
  , placeholders_path = media_path + '/placeholders'

module.exports = {
    development: {
        db: 'mongodb://localhost/myapp',
        root: root_path,
        paths: {
            root: root_path,
            images: images_path,
            attachments: attachments_path,
            placeholders: placeholders_path
        },
        app: {
            name: 'My App name'
        },
        imager: {
            debug: true,
            path: images_path,
            localUri: '/media/images'
        }
    },
    production: {
        db: 'mongodb://localhost/myapp',
        root: root_path,
        paths: {
            root: root_path,
            images: media_path,
            attachments: attachments_path,
            placeholders: placeholders_path
        },
        app: {
            name: 'My App name'
        },
        imager: {
            debug: false,
            path: images_path,
            localUri: '/media/images'
        }
    }
}