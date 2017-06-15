/*
SimpleEvent saves an iCal event and has methods to get information from this event.
*/
"use strict";

/* global quotedPrintable */

function ICalEvent (event) {
    if (!(this instanceof ICalEvent)) {
        return new ICalEvent(event)
    }
    
    this.event = event
}

ICalEvent.prototype.getTitle = function () {
    return this.event.summary ? this.event.summary.val : 'No title posted.'
}

ICalEvent.prototype.getStartTime = function () {
    return this.event.start || "No start time posted."
}

ICalEvent.prototype.getEndTime = function () {
    return this.event.end || "No end time posted."
}

ICalEvent.prototype.getLocation = function () {
    return this.event.location ? quotedPrintable.decode(this.event.location.val) : "No location posted."
}

ICalEvent.prototype.getDescription = function () {
    return this.event.description ? quotedPrintable.decode(this.event.description.val) : "No description posted."
}

ICalEvent.prototype.getFormatted = function () {
    return {
        title: this.getTitle(),
        start: this.getStartTime(),
        end: this.getEndTime(),
        location: this.getLocation(),
        description: this.getDescription()
    }
}