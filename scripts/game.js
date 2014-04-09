function Game(iJminefield) {
	this.jMinefield = iJminefield;
	this.minesArray = null;
	this.minesCount = 0;
}

Game.prototype.newGame = function(iRows, iCols) {

	var self = this;
	this.minesArray = new Array(iRows);

	//foreach row
	for(var rowNum = 0; rowNum < iRows; rowNum++) {

		this.minesArray[rowNum] = new Array(iCols);
		var RowDiv = $('<div>');

		//foreach column
		for(var colNum = 0; colNum < iCols; colNum++) {

			var cell = new Cell(self, (Math.random() < CHANCE_FOR_MINE) ? true : false, {
				row : rowNum,
				col : colNum
			});

			if(cell.isHasMine()) {
				this.minesCount++;
			}

			this.minesArray[rowNum][colNum] = cell;

			// this.minesArray.push(cell);

			RowDiv.append(cell.getJself());
		}

		this.jMinefield.append(RowDiv).append('<br/>');

	}

	console.log(this.minesArray);

}

Game.prototype.onCellMark = function(cell) {
	//check win game
	this.checkWin();
}

Game.prototype.onCellClick = function(cell) {

	//if cell is already revealed
	if(cell.isRevealed()) {

		return;
	}

	//end the game if this cell has a mine
	if(cell.isHasMine()) {
		this.gameOver();
	} else {
		this.reveal(cell);
		//check win game
		this.checkWin();
	}

}

Game.prototype.checkWin = function() {
	var matchCount = 0;
	var self = this;

	//iterate cells
	$.each(this.minesArray, function(index, value) {
		$.each(value, function(index, cell) {
			if(cell.isHasMine() && cell.isMarked()) {
				matchCount++;
				if(self.minesCount == matchCount) {

					//stop the timer
					timeConsole.stopTimer();

					// Win the game
					alert("You WIN !!!");
				}
			}
		});
	});
}

Game.prototype.reveal = function(cell) {

	if(cell.isRevealed()) {
		return;
	}

	//check sourrounding cells
	var minesSorround = this.countSorroundingMines(cell);

	if(minesSorround === 0) {
		//uncover the cell
		cell.setCellAsRevealed("&nbsp");

		//reveal all sorrounding cells

		var hasUp = (cell.position.row - 1 > -1);
		var hasRight = (cell.position.col + 1 < COLUMNS);
		var hasDown = (cell.position.row + 1 < ROWS);
		var hasLeft = (cell.position.col - 1 > -1);

		//upper
		if(hasUp)
			this.reveal(this.minesArray[cell.position.row - 1 ][cell.position.col]);

		//upper left
		if(hasUp && hasLeft)
			this.reveal(this.minesArray[cell.position.row - 1 ][cell.position.col - 1]);
		//upper right
		if(hasUp && hasRight)
			this.reveal(this.minesArray[cell.position.row - 1 ][cell.position.col + 1]);

		//left
		if(hasLeft)
			this.reveal(this.minesArray[cell.position.row ][cell.position.col - 1]);
		//right
		if(hasRight)
			this.reveal(this.minesArray[cell.position.row ][cell.position.col + 1]);

		//down
		if(hasDown)
			this.reveal(this.minesArray[cell.position.row + 1 ][cell.position.col]);
		//down left
		if(hasDown && hasLeft)
			this.reveal(this.minesArray[cell.position.row + 1 ][cell.position.col - 1]);
		// down right
		if(hasDown && hasRight)
			this.reveal(this.minesArray[cell.position.row + 1 ][cell.position.col + 1]);

	} else {
		//uncover the cell
		cell.setCellAsRevealed("&nbsp" + minesSorround);
	}

}

Game.prototype.countSorroundingMines = function(cell) {

	if(!cell) {
		return 0;
	}

	//how many sorrounding cells have mines
	var minesSorround = 0;

	var hasUp = (cell.position.row - 1 > -1);
	var hasRight = (cell.position.col + 1 < COLUMNS);
	var hasDown = (cell.position.row + 1 < ROWS);
	var hasLeft = (cell.position.col - 1 > -1);

	//check up
	if(hasUp) {
		minesSorround += (this.minesArray[cell.position.row - 1][cell.position.col].isHasMine()) ? 1 : 0;
	}

	//check right
	if(hasRight) {
		minesSorround += (this.minesArray[cell.position.row][cell.position.col + 1].isHasMine()) ? 1 : 0;
	}

	//check down
	if(hasDown) {
		minesSorround += (this.minesArray[cell.position.row + 1][cell.position.col].isHasMine()) ? 1 : 0;
	}

	//check left
	if(hasLeft) {
		minesSorround += (this.minesArray[cell.position.row][cell.position.col - 1].isHasMine()) ? 1 : 0;
	}

	//check upper right
	if(hasUp && hasRight) {
		minesSorround += (this.minesArray[cell.position.row - 1][cell.position.col + 1].isHasMine()) ? 1 : 0;
	}

	//check upper left
	if(hasUp && hasLeft) {
		minesSorround += (this.minesArray[cell.position.row - 1][cell.position.col - 1].isHasMine()) ? 1 : 0;
	}

	//check down left
	if(hasDown && hasLeft) {
		minesSorround += (this.minesArray[cell.position.row + 1][cell.position.col - 1].isHasMine()) ? 1 : 0;
	}

	//check down right
	if(hasDown && hasRight) {
		minesSorround += (this.minesArray[cell.position.row + 1][cell.position.col + 1].isHasMine()) ? 1 : 0;
	}

	return minesSorround;
}

Game.prototype.gameOver = function() {

	//stop the timer
	timeConsole.stopTimer();

	//reveal The field
	$.each(this.minesArray, function(index, value) {
		$.each(value, function(index, value) {
			value.unregisterClickListener();
			if(value.isHasMine()) {
				value.setCellAsMined();
			}
		});
	});
}
