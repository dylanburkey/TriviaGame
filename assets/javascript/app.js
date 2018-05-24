
// Webfont loader
WebFontConfig = {
    custom: {
        families: [
            'Gugi',
            'PT Serif'
        ],
        urls: [
            'https://fonts.googleapis.com/css?family=Gugi|PT+Serif'
        ]
    },
    timeout: 2000,
    active: function() {
        sessionStorage.fonts = true;
    }
};

// Start Triva Game
$('#trivia').hide();
$('#end').hide();

// Lazy Click Events
$(document).on('click', '#newGame', function(e) {
	game.reset();
});

$(document).on('click', '.start', function(e){
	game.questionStart();
	$('#screen1').hide();
	$('#trivia').show();
});

$(document).on('click', '#optionsRadios2', function(e) {
	game.clicked(e);
});


// Global Vars

var panel = $('#quiz');
// Lazy Fix
var userRes = $('#resLoad');
var countStart = 20;


// Triva Questions

// Start Game - Hold in Object
    var game = {
	questions: questions,
	currentQuestionPH: 0,
	counter: countStart,
	correct: 0,
	incorrect: 0,
	countdown: function() {//This function decrases timer by 1 sec
		game.counter--;//this argument decreases the count.
		$('#timer').html(game.counter);//load the counter into the html tag.

		if (game.counter == 0) {//When the count hits 0... 
			game.timeOut();//...The time out function is called. 
		}
	},
	questionStart: function() {
		timer = setInterval(game.countdown, 1000);
		panel.html('<h2 class="text-center">' + questions[this.currentQuestionPH].question + '</h2>');
		for (var i = 0; i < questions[this.currentQuestionPH].answer.length; i++) {
            // Very lazy code
			panel.append('<label class="question-label"><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"' + 'data-name="' + questions[this.currentQuestionPH].answer[i] + '">' + questions[this.currentQuestionPH].answer[i] + '</label>');
		}
	},
	nextQuestion: function() {
		game.counter = countStart;
		$('#timer').html(game.counter);
		game.currentQuestionPH++;
		game.questionStart();
	},
	timeOut: function() {
		clearInterval(timer);
		$('#timer').html(game.counter)

		panel.html('<h2>Wow!, you managed to fail at that question...</h2>');//Load text into html tag
		panel.append('<h3>Here is The Correct Answer: ' + questions[this.currentQuestionPH].correctAnswer);//Load text into html tag and the correct answer.

		if (game.currentQuestionPH === questions.length - 1) {//Subtract one to question array if it exactly equal to current quesion.
			setTimeout(game.results, 4 * 1000);//Than we delay 3 seconds ont he results.
		} else {
			setTimeout(game.nextQuestion, 4 * 1000);//Or delay 3 second to go to next question.
		}
	},
	results: function() {
		$('#trivia').hide();
		$('#end').show();
        clearInterval(timer);
        // Ask user for name -- and no time do that
		userRes.html('<h2>Your about this smart... </h2>');//Load text using .html method into window.
		userRes.append('<h3>Correct Answers: ' + game.correct + '</h3>');//Use the append method to load the correct answer.
		userRes.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');//Same
		userRes.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');//Same
		userRes.append('<button id="newGame">Are you a 1 or 0?</button>');//Create a button in and use the append method to load into page
	},
	clicked: function(e) {//User click function.
		clearInterval(timer);//Set timer count to 0
		if ($(e.target).data("name") === questions[this.currentQuestionPH].correctAnswer) {//
			this.answeredCorrectly();
		} else {
			this.answeredIncorrectly();
		}
    },
    // answer correctly
	answeredCorrectly: function() {
		clearInterval(timer);
		game.correct++;
		panel.html('<h2>Good for you, you are smart.</h2>');//Load text with .html method into window.

		if (game.currentQuestionPH === questions.length -1) {
			setTimeout(game.results, 4 * 1000);
		} else {
			setTimeout(game.nextQuestion, 4 * 1000);
		}
	},
	answeredIncorrectly: function() {
		clearInterval(timer);
		game.incorrect++;
		panel.html('<h2>Too Bad!</h2>');
		panel.append('<h3>The Correct answer is: ' + questions[game.currentQuestionPH].correctAnswer + '</h3>');//Load text with .html method into window.

		if (game.currentQuestionPH === questions.length - 1) {//Subtract one to question array if it exactly equal to current quesion.
			setTimeout(game.results, 4 * 1000);//Than we delay 3 seconds ont he results.
		} else {
			setTimeout(game.nextQuestion, 4 * 1000);//Or delay 3 second to go to next question.
		}
	},
	reset: function() {//Function that resets game.
		$('#trivia').show();
		$('#end').hide();
		this.currentQuestionPH = 0;
		this.counter = countStart;
		this.correct = 0;
		this.incorrect = 0;
		this.questionStart(); 

	}
};
	

	
		
		
	




