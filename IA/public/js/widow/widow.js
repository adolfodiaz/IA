/*
 * Defines widow namespace
 */
(function (window) {
    var widow = {}
      , debug = true

     widow.debug = debug

    // Exposes widow namespaces
    window.widow = widow

    // Add capabilities to Object class for legacy browsers
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!window.Object.keys) {
        window.Object.keys = (function () {
            'use strict';
            var hasOwnProperty = window.Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object')
                }

                var result = [], prop, i

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop)
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i])
                        }
                    }
                }
                return result;
            }
        }())
    }
})(window)