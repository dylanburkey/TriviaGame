
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

//+++++++++++++++++Click Events++++++++++++++++++++++
//===================================================

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


//+++++++++++++++++Global variables++++++++++++++++++
//===================================================

var panel = $('#quiz');
var userRes = $('#resLoad');
var countStart = 20;


//+++++++++++++++++Trivia Variable.+++++++++++++++++
//=================================================== 
var questions = 
	[

		{
			question: "What single city contains about 20% of the residents of its entire continent?",
			answer: ["Mexico", "California", "Sydney"],
			correctAnswer: "Sydney"
		},
		{
			question: "Madagascar is an island located of the southeast coast of what continent?",
			answer: ["Africa", "Poland", "Barzil", "Uruguay"],
			correctAnswer: "Africa"
		},
		{
			question: "Lake Tahoe straddles the border between which two U.S. states?",
			answer: ["Illinois & Indiana", "Alabama & Georgia", "California & Nevada"],
			correctAnswer: "California & Nevada"
		},
		{
			question: "In what country would you find Mount Kilimanjaro?",
			answer: ["Mexico", "California", "Tanzania"],
			correctAnswer: "Tanzania"
		},
		{
			question: "What is the capital of Iceland?",
			answer: ["Kópavogur", "Reykjavik", "Grindavík", "Akranes"],
			correctAnswer: "Reykjavik"
		},
		{
			question: "What is the largest lake in Africa?",
			answer: ["Lake Victoria", "Lake Tanganyika", "Lake Baikal", "Lake Kivu"],
			correctAnswer: "Lake Victoria"
		},
		{
			question: "The Alaskan Malamute is a type of what?",
			answer: ["Reptilian", "Cat", "Dog"],
			correctAnswer: "Dog"
		},
		{
			question: "Which country is the second largest in South America by surface area?",
			answer: ["Colombia", "Argentina", "Bolivia", "Brazil"],
			correctAnswer: "Argentina"
		},
		{
			question: "Which country is the second largest in Africa by surface area?",
			answer: ["Algeria", "Lybia", "Sudan", "Democratic Republic of Congo"],
			correctAnswer: "Democratic Republic of Congo"
		},
		{
			question: "What is the highest(from sea level to top) mountain in Europe?",
			answer: ["Mont Blanc", "Mount Shkhara", "Mount Ararat", "Mount Elbrus"],
			correctAnswer: "Mount Elbrus"
		},
		{
			question: "What is the longest river in Asia?",
			answer: ["Yangtze", "Yenisei", "Yellow River", "OB"],
			correctAnswer: "Yangtze"
		}

	];

//////////// Create object with var game and/////////////////
var game = {
	questions: questions,
	currentQuestion: 0,
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
	questionStart: function() {//This function loas the questions and sets timer
		timer = setInterval(game.countdown, 1000);//SetInterval Method used to specify 
		panel.html('<h2 class="text-center">' + questions[this.currentQuestion].question + '</h2>');//loads questions with a h2 tag into the html tag panel instance. 
		for (var i = 0; i < questions[this.currentQuestion].answer.length; i++) {//this loops through the questions.answer array and appends it to the panel instance.
			panel.append('<br><label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"' + 'data-name="' + questions[this.currentQuestion].answer[i] + '">' + questions[this.currentQuestion].answer[i] + '</label>');
		}
	},
	nextQuestion: function() {//Here the counter resets and loads the next question.
		game.counter = countStart;//Create an instance for countStart.
		$('#timer').html(game.counter);//Load the counter into the html tag.
		game.currentQuestion++;//Adds 1 question every time this function runs.
		game.questionStart();//Callback to start new question.
	},
	timeOut: function() {//Function for when the clock runs out.
		clearInterval(timer);//This sets the timer count to 0.
		$('#timer').html(game.counter);//Load the counter into the html tag.

		panel.html('<h2>Sorry Time is Up Bro!!</h2>');//Load text into html tag
		panel.append('<h3>Here is The Correct Answer: ' + questions[this.currentQuestion].correctAnswer);//Load text into html tag and the correct answer.
		panel.append('<img id="giph" src="http://i.giphy.com/3ornjXizVZDbngmjRK.gif"/>');//Same here.

		if (game.currentQuestion === questions.length - 1) {//Subtract one to question array if it exactly equal to current quesion.
			setTimeout(game.results, 4 * 1000);//Than we delay 3 seconds ont he results.
		} else {
			setTimeout(game.nextQuestion, 4 * 1000);//Or delay 3 second to go to next question.
		}
	},
	results: function() {
		$('#trivia').hide();//Hide trivia window 
		$('#end').show();//show Results window
		clearInterval(timer);//this sets the timer count to 0.
		userRes.html('<h2>Great Job Buddy, Lets see your Skills</h2>');//Load text using .html method into window.
		userRes.append('<h3>Correct Answers: ' + game.correct + '</h3>');//Use the append method to load the correct answer.
		userRes.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');//Same
		userRes.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');//Same
		userRes.append('<br><button id="newGame">Try Again??</button>');//Create a button in and use the append method to load into page
	},
	clicked: function(e) {//User click function.
		clearInterval(timer);//Set timer count to 0
		if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {//
			this.answeredCorrectly();
		} else {
			this.answeredIncorrectly();
		}
	},
	answeredCorrectly: function() {//Function created for when user answers correctly.
		clearInterval(timer);//Sets timer count to 0.
		game.correct++;//Add one count to the correct var.
		panel.html('<h2>Correct!</h2>');//Load text with .html method into window.
		panel.append('<img id="giph" src="http://i.giphy.com/26tknCqiJrBQG6bxC.gif"/>');//Same here.

		if (game.currentQuestion === questions.length -1) {
			setTimeout(game.results, 4 * 1000);
		} else {
			setTimeout(game.nextQuestion, 4 * 1000);
		}
	},
	answeredIncorrectly: function() {//Function created for when user answers incorrectly.
		clearInterval(timer);//Sets time count to 0
		game.incorrect++;//Adds one count to the incorrect var.
		panel.html('<h2>Too Bad!</h2>');//Load text with .html method into window.
		panel.append('<h3>The Correct answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');//Load text with .html method into window.
		panel.append('<img id="giph" src="http://i.giphy.com/3o6gb27m9SE4PPJyFy.gif"/>');////Load text with .html method into window.

		if (game.currentQuestion === questions.length - 1) {//Subtract one to question array if it exactly equal to current quesion.
			setTimeout(game.results, 4 * 1000);//Than we delay 3 seconds ont he results.
		} else {
			setTimeout(game.nextQuestion, 4 * 1000);//Or delay 3 second to go to next question.
		}
	},
	reset: function() {//Function that resets game.
		$('#trivia').show();//Show trivia window.
		$('#end').hide();//Hide results window.
		this.currentQuestion = 0;//Sets question to 0.
		this.counter = countStart;//Sets counter to 0.
		this.correct = 0;//Sets correct var to 0.
		this.incorrect = 0;//Sets incorrect to 0.
		this.questionStart();//Calls questionStart function. 

	}
};
	

	
		
		
	




