// Array of all the questions and choices to populate the questions. This might be saved in some JSON file or a database and we would have to read the data in.
var all_questions = [{
  question_string: "Could you tell me your surname?",
  choices: {
    correct: "Would you like me to spell it?",
    wrong: ["Do you like my family name?", "How do I say that?"]
}
}, {
  question_string: "This plant looks dead.",
  choices: {
    correct: "It only needs some water.",
    wrong: ["It's in the garden.", "It's sleeping."]
  }
}, {
  question_string: "I hope it doesn't rain.",
  choices: {
    correct: "So do I.",
    wrong: ["Of course not.", "Will it be wet?"]
  }
}, {
  question_string: 'Are you going to come inside soon?',
  choices: {
    correct: "In a minute.",
    wrong: ["For ever.", "Not long."]
  }
  
}
, {
  question_string: 'Who gave you this book, Lucy?',
  choices: {
    correct: "I bought it.",
    wrong: ["For my birthday.", "My uncle was."]
  }
  
}
, {
  question_string: 'Shall we go out for pizza tonight?',
  choices: {
    correct: "I'm too tired.",
    wrong: ["I know that.", "It's very good."]
  }
  
}
, {
  question_string: 'Do you mind if I come too?',
  choices: {
    correct: "That's fine!",
    wrong: ["I'd like to.", "I don't know if I can."]
  }
  
}
, {
  question_string: 'Would you like some ice in your drink or not?',
  choices: {
    correct: "I don't mind.",
    wrong: ["I hope so", "Yes, I shall."]
  }
  
}
, {
  question_string: 'How long are you here for?',
  choices: {
    correct: "Till tomorrow.",
    wrong: ["Since last week.", "Ten days ago."]
  }
  
}
, {
  question_string: ' I hope I haven\'t ...... you any trouble by changing the arrangements.',
  choices: {
    correct: "caused",
    wrong: ["put", "made", "done"]
  }
  
}
, {
  question_string: ' When you come to my house, ...... your camera with you.',
  choices: {
    correct: "bring",
    wrong: ["take", "show", "fetch"]
  }
  
}
, {
  question_string: 'Paul arrived at the shop ....... as the manager was closing for the day.',
  choices: {
    correct: "just",
    wrong: ["even", "still", "right"]
  }
  
}
, {
  question_string: ' I would ...... to stay at home and relax for a change.',
  choices: {
    correct: "prefer",
    wrong: ["rather", "better", "enjoy"]
  }
  
}
, {
  question_string: 'Is there ...... of food for everyone?',
  choices: {
    correct: "plenty",
    wrong: ["adequate", "enough", "sufficient"]
  }
  
}
, {
  question_string: 'Lily says she\'s happy at school but she\'s ...... complaining.',
  choices: {
    correct: "always",
    wrong: ["rarely", "sometimes", "often"]
  }
  
}
, {
  question_string: '...... the step when you go in.',
  choices: {
    correct: "Mind",
    wrong: ["Consider", "Attend", "Look"]
  }
  
}
, {
  question_string: '...... stay the night if it\'s too difficult to get home.',
  choices: {
    correct: "By all means",
    wrong: ["At all costs", "In all", "On the whole"]
  }
  
}
, {
  question_string: 'No ...... Hannah is happy when you think how many prizes she has won recently.',
  choices: {
    correct: "wonder",
    wrong: ["surprise", "problem", "question"]
  }
  
}
, {
  question_string: 'I\'d rather you ...... to her why we can\'t go.',
  choices: {
    correct: "explained",
    wrong: ["would explain", "to explain", "will explain"]
  }
  
}
, {
  question_string: 'Before making a decision, the leader considered all ...... of the argument.',
  choices: {
    correct: "sides",
    wrong: ["features", "perspectives", "shades"]
  }
  
}];

// An object for a Quiz, which will contain Question objects.
var Quiz = function(quiz_name) {
  // Private fields for an instance of a Quiz object.
  this.quiz_name = quiz_name;
  
  // This one will contain an array of Question objects in the order that the questions will be presented.
  this.questions = [];
}

// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
Quiz.prototype.add_question = function(question) {
  // Randomly choose where to add question
  var index_to_add_question = Math.floor(Math.random() * this.questions.length);
  this.questions.splice(index_to_add_question, 0, question);
}

// A function that you can enact on an instance of a quiz object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the quiz in.
Quiz.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;
  
  // Hide the quiz results modal
  $('#quiz-results').hide();
  
  // Write the name of the quiz
  $('#quiz-name').text(this.quiz_name);
  
  // Create a container for questions
  var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');
  
  // Helper function for changing the question and updating the buttons
  function change_question() {
    self.questions[current_question_index].render(question_container);
    $('#prev-question-button').prop('disabled', current_question_index === 0);
    $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);
    
    // Determine if all questions have been answered
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  }
  
  // Render the first question
  var current_question_index = 0;
  change_question();
  
  // Add listener for the previous question button
  $('#prev-question-button').click(function() {
    if (current_question_index > 0) {
      current_question_index--;
      change_question();
    }
  });
  
  // Add listener for the next question button
  $('#next-question-button').click(function() {
    if (current_question_index < self.questions.length - 1) {
      current_question_index++;
      change_question();
    }
  });
  
  // Add listener for the submit answers button
  $('#submit-button').click(function() {
    // Determine how many questions the user got right
    var score = 0;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;
      }
    }
    
    // Display the score with the appropriate message
    var percentage = score / self.questions.length;
    console.log(percentage);
    var message;
    if (percentage === 1) {
      message = 'Great job!'
    } else if (percentage >= .75) {
      message = 'You did alright.'
    } else if (percentage >= .5) {
      message = 'Better luck next time.'
    } else {
      message = 'Maybe you should try a little harder.'
    }
    $('#quiz-results-message').text(message);
    $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
    $('#quiz-results').slideDown();
    var share_link = "https://www.facebook.com/dialog/feed?app_id=184683071273&link=https%3A%2F%2Fmedzed.github.io%2FQuick_English_Test%2F&description=A%20quick%20English%20test.&name=My%20result%20is%20"+ score +"/"+self.questions.length+"%20%3A%20&caption=%20&description=.&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F";
 
    $('#quiz-results-share-score').attr('href', share_link);
      // $('#quiz button').slideUp();
    });
  
  // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
  question_container.bind('user-select-change', function() {
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  });
}

// An object for a Question, which contains the question, the correct choice, and wrong choices. This block is the constructor.
var Question = function(question_string, correct_choice, wrong_choices) {
  // Private fields for an instance of a Question object.
  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null; // Index of the user's choice selection
  
  // Random assign the correct choice an index
  this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);
  
  // Fill in this.choices with the choices
  var number_of_choices = wrong_choices.length + 1;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {
      // Randomly pick a wrong choice to put in this index
      var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
      this.choices[i] = wrong_choices[wrong_choice_index];
      
      // Remove the wrong choice from the wrong choice array so that we don't pick it again
      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
}

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;
  
  // Fill out the question label
  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.text(this.question_string);
  
  // Clear any radio buttons and create new ones
  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function() {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    // Create the radio button
    var choice_radio_button = $('<input>')
      .attr('id', 'choices-' + i)
      .attr('type', 'radio')
      .attr('name', 'choices')
      .attr('value', 'choices-' + i)
      .attr('checked', i === this.user_choice_index)
      .appendTo(container);
    
    // Create the label
    var choice_label = $('<label>')
      .text(this.choices[i])
      .attr('for', 'choices-' + i)
      .attr('class', 'thumbnail')
      .appendTo(container);
  }
  
  // Add a listener for the radio button to change which one the user has clicked on
  $('input[name=choices]').change(function(index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();
    
    // Change the user choice index
    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));
    
    // Trigger a user-select-change
    container.trigger('user-select-change');
  });
}

// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function() {
  // Create an instance of the Quiz object
  var quiz = new Quiz('');
  
  // Create Question objects from all_questions and add them to the Quiz object
  for (var i = 0; i < all_questions.length; i++) {
    // Create a new Question object
    var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);
    
    // Add the question to the instance of the Quiz object that we created previously
    quiz.add_question(question);
  }
  
  // Render the quiz
  var quiz_container = $('#quiz');
  quiz.render(quiz_container);
});
