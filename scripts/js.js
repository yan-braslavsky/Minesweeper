function onStartButtonClicked() {

	$(this).html('Restart');

	//remove all previous elements from mine field
	jMinefield.empty();

	//restart the timer
	timeConsole.restartTimer();

	//create a new game instance
	var game = new Game(jMinefield);

	//Reset Difficulty
	resetDifficulty();

	//create a new game
	game.newGame(ROWS, COLUMNS);
}

function resetDifficulty() {
	switch($('select').val()) {
		case  Difficulty.easy :
			ROWS = Difficulty.get.easy.rows;
			COLUMNS = Difficulty.get.easy.columns;
			CHANCE_FOR_MINE = Difficulty.get.easy.chanceForMine;
			break;
		case  Difficulty.medium :
			ROWS = Difficulty.get.medium.rows;
			COLUMNS = Difficulty.get.medium.columns;
			CHANCE_FOR_MINE = Difficulty.get.medium.chanceForMine;
			break;
		case  Difficulty.hard :
			ROWS = Difficulty.get.hard.rows;
			COLUMNS = Difficulty.get.hard.columns;
			CHANCE_FOR_MINE = Difficulty.get.hard.chanceForMine;
			break;
	}
}

