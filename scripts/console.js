TIMER_INTERVAL = 1000;

function Console(jConsole) {
	this.jConsole = jConsole;
	this.intervalId = null;
}

Console.prototype.restartTimer = function() {

	var self = this;
	self.jConsole.html("0:0")

	if(this.intervalId != null) {
		this.stopTimer();
	}

	this.intervalId = setInterval(function() {

		TIME_ELLAPSED += TIMER_INTERVAL;
		self.jConsole.html(self.millisecondsToString(TIME_ELLAPSED));

	}, TIMER_INTERVAL);

}

Console.prototype.stopTimer = function() {
	TIME_ELLAPSED = 0;
	clearInterval(this.intervalId);
}

Console.prototype.millisecondsToString = function(iMilliseconds) {

	var seconds = iMilliseconds / 1000;

	var numyears = Math.floor(seconds / 31536000);
	var numdays = Math.floor((seconds % 31536000) / 86400);
	var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
	var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

	return "" + numminutes + ":" + numseconds;
}
