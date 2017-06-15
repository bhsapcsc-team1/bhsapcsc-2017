/*
SimpleEvent saves an iCal event and has methods to get information from this event.
*/

class SimpleEvent {
	constructor(ev) {
		this.event = ev;
	}

	getTitle() {
		if(this.event.summary != null) {
			return this.event.summary.val;
		} else {
			return "No title posted.";
		}
	}
	getStartTime() {
		if(this.event.start != null) {
			return this.event.start;
		} else {
			return "No start time posted.";
		}
	}
	getEndTime() {
		if(this.event.end != null) {
			return this.event.end;
		} else {
			return "No end time posted.";
		}
	}
	getLocation() {
		if(this.event.location != null) {
			return this.formatString(this.event.location.val);
		} else {
			return "No location posted.";
		}
	}
	getDescription() {
		if(this.event.description != null) {
			return this.formatString(this.event.description.val);
		} else {
			return "No description posted.";
		}
	}

	/*returns an Object with a title, start date, end date, location and description of the event*/
	getFormatted(){
		return {
			"title": this.getTitle(),
			"start": this.getStartTime(),
			"end": this.getEndTime(),
			"location": this.getLocation(),
			"description": this.getDescription()
		};
	}
	formatString(s) {
		while(s.indexOf("=0D=0A")!=-1) {
			s = s.substring(0, s.indexOf("=0D=0A")) +"\n"+ s.substring(s.indexOf("=0D=0A")+6, s.length);
		}
		return s;
	}
}
