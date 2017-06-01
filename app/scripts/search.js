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

function mycallback (posts) {
    $(posts.map(renderPost)).appendTo('#demo').collapsible()
}

function renderPost (post) {
    return $('<article>', { 'class': 'selected-story', 'id': post.id })
        .append(
            $('<h3>', { text: post.title }),
            '<h4>Question</h4>',
            $('<p>', { text: post.post_content }),
            '<h4>Response:</h4>',
            $('<p>', { text: post.comment_content })
        )[0]
}

loadJSONP('https://askbys.org/askbysmobile/MobileWPSearch.php?search=' + query.category, 'mycallback')
