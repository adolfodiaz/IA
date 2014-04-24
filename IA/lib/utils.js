/**
 * Creates pagination structure
 *
 * @param {String} req_url
 * @param {Integer} pages
 * @param {Integer} page
 * @return {String}
 * @api public
 */

exports.pagination = function (req_url, page, pages) {
    if (pages < 2) return false;

    var url = require('url')
    , qs = require('querystring')
    , params = qs.parse(url.parse(req_url).query)
    , str = ''

    for (var p = 0; p < pages; p++) {
        params.page = p
        clas = page == p ? "active" : "no"
        str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">' + p + '</a></li>'
    }

    return str
}
