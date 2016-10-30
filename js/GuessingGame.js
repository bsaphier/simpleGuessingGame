function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
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
  this.winningNumber = generateWinningNumber();
  this.pastGuesses = [];
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
  if (typeof num !== 'number' || num < 1 || num > 100) {
    throw 'That is an invalid guess.';
  } else {
    this.playersGuess = num;
    return this.checkGuess();
  }
};

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    $('#hint, #submit').prop('disabled', true);
    $('#instruct').text('Press the Reset button to play again!');
    return 'You Win!';
  }
  else {
    if (this.pastGuesses.indexOf(this.playersGuess) !== -1) {
      return 'You have already guessed that number.';
    }
    else {
      this.pastGuesses.push(this.playersGuess);
      $('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        $('#hint, #submit').prop('disabled', true);
        $('#instruct').text('Press the Reset button to play again!');
        return 'You Lose.';
      } else {
        var diff = this.difference();
        if (this.isLower()) {
          $('#instruct').text('Guess higher.');
        } else {
          $('#instruct').text('Guess lower.');
        }
        if (diff < 10) return 'You\'re burning up!';
        else if (diff < 25) return 'You\'re lukewarm.';
        else if (diff < 50) return 'You\'re a bit chilly.';
        else return 'You\'re ice cold!';
      }
    }
  }
};

Game.prototype.provideHint = function() {
  return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
};

function guessFunc(_game) {
  var guess = +$('#player-input').val();
  $('#player-input').val('');
  var output = _game.playersGuessSubmission(guess);
  $('#title').text(output);
}

function jiggle() {
  $('#input-parent').animate({margin: '4% auto 3%'}, 50);
  $('#input-parent').animate({margin: '2% auto 5%'}, 50);
}

$(document).ready(function() {

  var game = newGame();

  $('#submit').click(function(e) {
    jiggle();
    guessFunc(game);
  });

  $('#player-input').keypress(function(event) {
    if (event.which === 13) {
      jiggle();
      guessFunc(game);
    }
  });

  $('#hint').click(function() {
    var hints = game.provideHint();
    $('#instruct').text('The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
  });

  $('#reset').click(function() {
    game = newGame();
    $('.guess').text('-');
    $('#title').text('Welcome To The Guessing Game.');
    $('#instruct').text('Enter a number between 0 and 100');
    $('#hint, #submit').prop('disabled', false);
  })
})
