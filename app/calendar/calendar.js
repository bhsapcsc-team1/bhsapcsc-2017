/**
* requires ical.js, quoted-printable.js, jquery lib
*/

/* global ical, ICalEvent, $ */

function getObjectValues (data) {
  return Object.keys(data).map(function (k) {
    return this[k]
  }, data)
}

function parseICalEvents (string) {
  return getObjectValues(ical.parseICS(string)).map(ICalEvent)
}


var fetchCalendar = function(startDate, endDate, successFunction) {
  console.log(startDate);
  console.log(endDate);


  // var url = "https://www.bisd303.org/site/UserControls/Calendar/EventExport.aspx?ModuleInstanceID=18875&StartDate=" + formatDateForFetch(startDate) + "&EndDate=" + formatDateForFetch(endDate);
  var url = "https://crossorigin.me/https://www.bisd303.org/site/UserControls/Calendar/EventExport.aspx?ModuleInstanceID=7&StartDate=" + formatDateForFetch(startDate) + "&EndDate=" + formatDateForFetch(endDate);

  $.ajax({
    'url': url,
    success: function(result) {
      successFunction(parseICalEvents(result))
    }
  });
}

var formatDateForFetch = function(date) {
  // console.log(date);
  if(date instanceof Date) {
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  }
  return date
}

function fourteenDate (date) {
  return new Date(date.getTime() + 14*86400e3)
}




var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatEvent(entry) {
    if (entry.getStartTime() instanceof Date) {
        return '<div data-role="collapsible" data-collapsed="true">' +
            '<h3>' + entry.getTitle() + ": " + formatDateForFetch(entry.getStartTime()) + '</h3>' +
            '<p>' + entry.getDescription() + "<br/>" + "Location: " + entry.getLocation() + '</p>' + '</div>'
    }
    return "";
}

function formatEvents(entries) {
    return entries.map(formatEvent).join('')
}

function insertEntries(entries) {
    console.log(entries);
    var a = document.getElementById('initialEvents');
    a.innerHTML = formatEvents(entries);
    $("#initialEvents").enhanceWithin();
}

function setMonth(date) {
    var month = date.getMonth();
    var a = $('.month-name')[0]
    a.innerHTML = months[month] + " Events";
}

function startMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);

}

function endOfTheMonth (date) {
    return new Date(date.getFullYear(), (date.getMonth() + 1) % 12, 0);
}

function makeDate (year, month, day) {
    return new Date(year, month - 1, day)
}


function reloadCalendar () {
    fetchCalendar(getDateFromValue(document.getElementById(selectedOption).value), getDateFromValue(document.getElementById(selectedOption).value + 1), insertEntries);
}


function init () {
  window.$year = document.getElementById('year')
  window.$month = document.getElementById('month')
  
  var now = new Date
  $year.value = now.getFullYear()
  $($month).selectmenu('refresh', true)
  
  
  var startDate = startMonth(now);
  setMonth(now);
  var endDate = fourteenDate(now);
  
  fetchCalendar(startDate, endDate, insertEntries);

}

$(init)

$(function () {
  $('#year, #month').on('change', function () {
    
  })
})
