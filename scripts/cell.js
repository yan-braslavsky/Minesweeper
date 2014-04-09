/**
 * fkjsldkjfgalsdkjfagldkj
 */
function Cell(iListener, iHasMine, iPosition) {

	this.jSelf = $('<div>').addClass("cell inline uncovered ");
	this.listener = iListener;
	this.hasMine = iHasMine;
	this.position = iPosition;
	this.revealed = false;
	this.marked = false;

	var self = this;

	//set onclick listeners
	this.jSelf.bind("mousedown", function(e) {
		if(e.which === 3) {
			/* Right Mousebutton was clicked! */
			(self.isMarked()) ? self.setCellAsUncovered() : self.setCellAsMarked();
			self.marked = !self.marked;

			//notify event listener of cell click
			if(self.listener != null) {
				self.listener.onCellMark(self);
			}

		} else if(e.which === 1) {

			//notify event listener of cell click
			if(self.listener != null) {
				self.listener.onCellClick(self);
			}
		}
	});

}

Cell.prototype.setCellAsMarked = function() {
	this.jSelf.removeClass().addClass("cell inline marked ");
	return this;
}

Cell.prototype.setCellAsMined = function() {
	this.jSelf.removeClass().addClass("cell inline mined ");
	return this;
}

Cell.prototype.setCellAsUncovered = function() {
	this.jSelf.removeClass().addClass("cell inline uncovered ");
	return this;
}

Cell.prototype.setCellAsRevealed = function(num) {
	this.jSelf.removeClass().addClass("cell inline revealed ").html(num);
	this.revealed = true;
	this.unregisterClickListener();
	return this;
}

Cell.prototype.getJself = function() {
	return this.jSelf;
}

Cell.prototype.isMarked = function() {
	return this.marked;
}
Cell.prototype.isHasMine = function() {
	return this.hasMine;
}
Cell.prototype.isRevealed = function() {
	return this.revealed;
}
Cell.prototype.unregisterClickListener = function() {
	this.jSelf.unbind();
}
