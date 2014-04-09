/**
 * Difficulty enumiration
 */
Difficulty = {
	easy : 'easy',
	medium : 'medium',
	hard : 'hard',
	get : {
		easy : {
			rows : 3,
			columns : 15,
			chanceForMine :0.1
		},
		medium : {
			rows : 10,
			columns : 15,
			chanceForMine :0.2
		},
		hard : {
			rows : 15,
			columns : 15,
			chanceForMine :0.3
		}
	}
}

/**
 * ROWS AND COLUMNS and the default value
 */
ROWS = 5;
COLUMNS = 5; 

/**
 * Interval ID
 */
INTERVAL_ID = 0;

/**
 * Time ellapsed since last interval call
 */
TIME_ELLAPSED = 0;

CHANCE_FOR_MINE = 0.3;