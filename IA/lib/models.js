/*
 * Setters
 */
exports.setIgnoringEmpty = function (val) {
    return ('' === val.trim())? null : val
}

/*
 * Setter utilizado cuando se desea prevenir un CastError
 * debe ser utilizado junto con la validación isNumberOrEmpty
 * o isNumber
 */
exports.setNumberOrUndefined = function (val) {

    // Si es verdadero es porque el usuario no ingreso número
    // es tarea de algún validador verificar si el campo es requerido
    if (val == '')
        return null

    // Al retornar 'undefined' se previene un CastError
    var v = Number(val)
    return (isNaN(v))? undefined : v
    
}

exports.setObjectID = function (val) {
    var len = val.length;
    if (len == 12 || len == 24) 
        return (/^[0-9a-fA-F]+$/.test(val))? undefined:val
    else 
        return undefined
}

exports.isNumber = function (val) {
    return 'number' == typeof val
}

exports.isNumberOrEmpty = function (val) {

    // Es verdadero cuando el usuario no ingreso ningun numero
    if (val === null)
        return true
    else
        return 'number' == typeof val
}

exports.isSet = function (val) {
    return (val)? true:false
}