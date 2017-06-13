/**
* requires ical.js, quoted-printable.js, jquery lib
*/
var eventList;
var iCalParse = function(rawData) {
    var parseResult = ical.parseICS(rawData);

    eventList = [];

    for (var k in parseResult) {
        if (parseResult.hasOwnProperty(k)) {
            var ev = parseResult[k];
            eventList.push(new SimpleEvent(ev));
        }
    }

    return eventList;
    // $( "#iCal" ).html( "<pre>" + rawData + "</pre>" ); // This displays the data properly
}

var fetchCalendar = function(startDate, endDate, successFunction) {
  console.log(startDate);
  console.log(endDate);


  // var url = "https://www.bisd303.org/site/UserControls/Calendar/EventExport.aspx?ModuleInstanceID=18875&StartDate=" + formatDateForFetch(startDate) + "&EndDate=" + formatDateForFetch(endDate);
  var url = "https://www.bisd303.org/site/UserControls/Calendar/EventExport.aspx?ModuleInstanceID=7&StartDate=" + formatDateForFetch(startDate) + "&EndDate=" + formatDateForFetch(endDate);

  $.ajax({
    'url': url,
    success: function(result) {
      // console.log(result);
      var cal = iCalParse(result);
      // console.log(cal);
      successFunction(cal);
    }
  });
}

var formatDateForFetch = function(date) {
  console.log(date);
  if(date instanceof Date) {
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  } else if(date.length === 8) {
    return (date.substring(4, 6) + "/" + date.substring(6, 8) + "/" + date.substring(0, 4));
  }
}

function fourteenDate(date) {
  var c = new Date(date.getTime() + 14*24*60*60*1000);
  return c;
}
