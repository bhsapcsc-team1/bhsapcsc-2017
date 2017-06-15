var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function tooMuchGoodStuff(date) {
    if (date.getHours() < 12) {
        return date.getHours() + ":" + date.getMinutes() + " am";
    } else if (date.getHours() == 12) {
        return date.getHours() + ":" + date.getMinutes() + " pm";
    } else {
        return date.getHours() - 12 + ":" + date.getMinutes() + " pm";
    }
}


function formatEvent(entry) {
    if (entry.getStartTime() instanceof Date) {
        return '<div data-role="collapsible" data-collapsed="true">' +
            '<h3>' + entry.getTitle() + ": " + formatDateForFetch(entry.getStartTime()) + '</h3>' +
            '<p>' + entry.getDescription() + "<br/>" + "Location: " + entry.getLocation() + '</p>' + '</div>'
    }
    return "";
}

function formatEvents(entries) {
    console.log(entries);
    var string = '';
    for (var i = 0; i < (entries.length); i++) {
        string = string + formatEvent(entries[i]);
    }
    console.log(string);
    return string
}

function insertEntries(entries) {
    console.log(entries);
    var a = document.getElementById('initialEvents');
    a.innerHTML = formatEvents(entries);
    $("#initialEvents").enhanceWithin();
}

function setMonth(date) {
    var month = date.getMonth();
    var a = document.getElementById('month');
    a.innerHTML = months[month] + " Events";
}

function currentDate() {
    var d = new Date();
    return d;
}

function startMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);

}

function endOfTheMonth(date) {
    return new Date(date.getFullYear(), (date.getMonth() + 1) % 12, 0);
}

function fourteenDate(date) {
    var c = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
    return c;
}