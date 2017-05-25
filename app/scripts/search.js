var query = parseQueryString(location.search)

function parseQueryString(qs) {
    if (qs[0] == '?') qs = qs.slice(1)
    return qs.split('&').reduce(function(result, entry) {
        entry = entry.split('=')
        var key = entry[0],
            value = entry[1]
        result[key] = value == null ? null : value
        return result
    }, {})
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1)
}

var names = {
    'drugs-alcohol': 'Drugs and Alcohol'
}

var name = names[query.category] || capitalize(query.category)
document.querySelector('h2').textContent = name
document.title += ' \u2014 ' + name

function loadJSONP(url, callback) {
    $.getScript(url + (/\?/.test(url) ? '&' : '?') + 'callback=' + callback)
}
var mycallback = function(data) {
    $.each(data, function(index, s) {
        $('#demo').append('<div data-role="collapsible" id="' + s.id + '"></div>')
        var content = '<h3>' + s.title + '</h3>' +
            '<p><strong>Question:</strong><br/>' + s.post_content +
            '<p><strong>Response:</strong><br/>' + s.comment_content + '</p></p>';
        $('#' + s.id).append(content);
    })
    $('div[data-role=collapsible]').collapsible();
}
loadJSONP('https://askbys.org/askbysmobile/MobileWPSearch.php?search=' + query.category, 'mycallback'); //use jsonp callback facility to output json from our jsonp test page
