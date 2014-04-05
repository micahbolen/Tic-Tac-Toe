/// <reference path="IObserver.ts" /> 
/// <reference path="PositionPrettyName.ts" /> 
module TicTacToe {
	export class Game implements IObserver {

		private _computerPlayerPlayedMoves:number[] = [];
		private _humanPlayerPlayedMoves:number[] = [];
		private _nextPlayer:string;
		private _winner:any = false;
		private _humanScore = 0;
		private _computerScore = 0;
		private _winningSequences = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,5,8],
			[2,5,6]
		];

		private _checkForWinner() {

			// check if human player has played at least three moves
			if(this._humanPlayerPlayedMoves.length >= 3) {
				// check if human won (should never happen)
				for(var i=0; i<this._winningSequences.length; i++) {
					var match1 = this._humanPlayerPlayedMoves.indexOf(this._winningSequences[i][0]);
					var match2 = this._humanPlayerPlayedMoves.indexOf(this._winningSequences[i][1]);
					var match3 = this._humanPlayerPlayedMoves.indexOf(this._winningSequences[i][2]);
					if(match1 !== -1 && match2 !== -1 && match3 !== -1) {
						console.log('Winner is Human Player.');
						this._humanScore++;
						this._winner = 'Human Player';
						this._reset('Human Player'); // winner goes first
						return;
					}
				}
			}

			// check if computer player has played at least three moves
			if(this._computerPlayerPlayedMoves.length >= 3) {
				// check if computer won (should always happen)
				for(var i=0; i<this._winningSequences.length; i++) {
					var match1 = this._computerPlayerPlayedMoves.indexOf(this._winningSequences[i][0]);
					var match2 = this._computerPlayerPlayedMoves.indexOf(this._winningSequences[i][1]);
					var match3 = this._computerPlayerPlayedMoves.indexOf(this._winningSequences[i][2]);
					if(match1 !== -1 && match2 !== -1 && match3 !== -1) {
						console.log('Winner is Computer Player.');
						this._computerScore++;
						this._winner = 'Computer Player';
						this._reset('Computer Player'); // winner goes first
						return;
					}
				}
			}

			return this._winner = false;
		}

		private _reset(nextPlayer) {
			console.log('Game over.');
			console.log('Human Score: ' + this._humanScore);
			console.log('Computer Score: ' + this._computerScore);
			console.log('');
			this._computerPlayerPlayedMoves = [];
			this._humanPlayerPlayedMoves = [];
			this._nextPlayer = nextPlayer;
		}

		getWinner() {
			return this._winner;
		}

	    update(arg:any) {
	        console.log(
	        	'Game has been notified and ' 
	        	+ arg.player 
	        	+ ' made move at position #' 
	        	+ arg.madeMove 
	        	+ ' aka ' 
	        	+ PositionPrettyName[arg.madeMove]
        	);

        	if(arg.player === 'Computer Player') {
        		this._computerPlayerPlayedMoves.push(arg.madeMove);
        		this._nextPlayer = 'Human Player';
        	} else {
        		this._humanPlayerPlayedMoves.push(arg.madeMove);
        		this._nextPlayer = 'Computer Player';
        	}

        	this._checkForWinner();
	    }

	}
}