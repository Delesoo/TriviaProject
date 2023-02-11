let questionNumber = 1;
let correctAnswers = 0;
let questionCount = 0;
let correctAnswerGlobal

function getRandomQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&category=15&difficulty=medium&type=multiple")
      .then(response =>  response.json())
      .then(data => {
        console.log(data);

        correctAnswerGlobal = data.results[0].correct_answer;

        const questionElement = document.getElementById('question');
        const choicesElement = document.getElementsByClassName('choices');

        //wamoigebs swor da araswor pasuxebs
        let correctAnswer = data.results[0].correct_answer;
        let incorrectAnswers = data.results[0].incorrect_answers;

        //filtravs swor pasuxebs arasworisagan
        incorrectAnswers = incorrectAnswers.filter(answer => answer !== correctAnswer);

        if (questionElement && choicesElement.length > 0){
          questionElement.innerHTML = data.results[0].question;

          const choices = [...incorrectAnswers, correctAnswer];
             
          //shaflavs choices
          choices.sort(() => Math.random() - 0.5);

          for (let i = 0; i < choicesElement.length; i++){
            const choice = choices[i];
            choicesElement[i].getElementsByTagName("label")[0].innerHTML = choice;
            choicesElement[i].getElementsByTagName("input")[0].setAttribute("value", choice);
            choicesElement[i].getElementsByTagName("input")[0].setAttribute("name", "answers");
          }
        }else {
          console.log("question or choices element not found")
        }

        document.querySelectorAll("input[name^='answers']").forEach(input => input.checked = false);

        document.getElementById("question-number").innerHTML = "Question #" + questionNumber;
        questionNumber++;

        if(questionNumber === 11){
          questionNumber = 1;
        }

        questionCount++;

        if(questionCount === 11){
          alert(`You answered ${correctAnswers} questions correctly!`);
        }

      })
      .catch(catchError => console.log(catchError));

      const button = document.getElementById("get-random-question");
        if (button) {
        button.addEventListener("click", getRandomQuestion);
        }
  }

  //Next ze dajerisas itvlis swor pasuxebs
  const nextButton = document.getElementById("get-random-question");
        nextButton.addEventListener("click", function(){
          const selectedAnswer = document.querySelector('input[name="answers"]:checked').value;
          if (selectedAnswer === correctAnswerGlobal) {
            correctAnswers++;
          }
        })

  console.log(getRandomQuestion())





  

