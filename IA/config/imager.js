var env = process.env.NODE_ENV || 'development',
    config = require('config')[env]

module.exports = {
    variants: {
        variant1: {
            resize: {
                default: "814x2000"
            }
        },
        variant2:  {
            resize: {
                large: "1600x1600"
            },
            resizeAndCrop: {
                thumb: {
                    resize: "150x1000",
                    crop: "90x90"
                }
            }
        }
    },

    storage: {
        Rackspace: {
            auth: {
                username: "USERNAME",
                apiKey: "API_KEY",
                host: "lon.auth.api.rackspacecloud.com"
            },
            container: "CONTAINER_NAME"
        },

        // Key: AKIAI3D45K4TCHMF3DGQ
        // secreta: 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 
        
        S3: {
            key: 'API_KEY',
            secret: 'SECRET',
            bucket: 'BUCKET_NAME',
            storageClass: 'REDUCED_REDUNDANCY'
        },
        
        Local: {
            path: config.imager.path
        },
        
        // ,
        // uploadDirectory: config.imager.uploadTo

        /*
         * Esto no parte de la configuración estándar de imager.
         * Fue usado para cuando el archivo no es subido a un cdn
         * en dicho caso la cdnUri es reemplazado por la uri local
         */
        
        localUri: config.imager.localUri
    },
    
    debug: config.imager.debug
}