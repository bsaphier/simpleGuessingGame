function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  var m = arr.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

function newGame() {
  return new Game();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(num) {
  if (typeof num !== 'number') {
    throw 'That is an invalid guess.';
  } else if (num < 1 || num > 100) {
    throw 'That is an invalid guess.';
  } else {
    this.playersGuess = num;
    return this.checkGuess(num);
  }
};

Game.prototype.checkGuess = function(guess) {
  if (guess === this.winningNumber) {
    return 'You Win!';
  }

  if (this.pastGuesses.indexOf(guess) !== -1) {
    return 'You have already guessed that number.';
  }

  if (this.pastGuesses.indexOf(guess) !== -1 || guess !== this.winningNumber) {
    this.pastGuesses.push(guess);
  }

  if (this.pastGuesses.length >= 5) {
    return 'You Lose.';
  }

  if (Math.abs(guess - this.winningNumber) < 10) {
    return 'You\'re burning up!';
  } else if (Math.abs(guess - this.winningNumber) < 25) {
    return 'You\'re lukewarm.';
  } else if (Math.abs(guess - this.winningNumber) < 50) {
    return 'You\'re a bit chilly.';
  } else if (Math.abs(guess - this.winningNumber) < 100) {
    return 'You\'re ice cold!';
  }

};

Game.prototype.provideHint = function() {
  return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
};

$(document).on('ready', function() {
  $('#submit').on('click', function() {
    console.log('hello ben');
  });
});
