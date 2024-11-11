import React, { useState, useEffect } from "react";
import WelcomeP from "./WelcomeP";
import Question from "./Question";
import Result from "./Result";
import MyProgressBar from "./MyProgressBar";
import "./Quiz.css";

const questions = [
  {
    questionText: "Which team won the NBA Championship in 2024?",
    options: [
      { answerText: "Denver Nuggets", isCorrect: false },
      { answerText: "Miami Heat", isCorrect: false },
      { answerText: "Golden State Warriors", isCorrect: false },
      { answerText: "Boston Celtics", isCorrect: true },
    ],
  },
  {
    questionText: "Which team won the NBA Championship in 2023?",
    options: [
      { answerText: "Denver Nuggets", isCorrect: true },
      { answerText: "Miami Heat", isCorrect: false },
      { answerText: "Golden State Warriors", isCorrect: false },
      { answerText: "Boston Celtics", isCorrect: false },
    ],
  },
  {
    questionText: "Which team claimed the NBA title in 2022?",
    options: [
      { answerText: "Golden State Warriors", isCorrect: true },
      { answerText: "Boston Celtics", isCorrect: false },
      { answerText: "Milwaukee Bucks", isCorrect: false },
      { answerText: "Phoenix Suns", isCorrect: false },
    ],
  },
  {
    questionText: "Which team won the NBA Championship in 2021?",
    options: [
      { answerText: "Milwaukee Bucks", isCorrect: true },
      { answerText: "Phoenix Suns", isCorrect: false },
      { answerText: "Los Angeles Lakers", isCorrect: false },
      { answerText: "Atlanta Hawks", isCorrect: false },
    ],
  },
  {
    questionText: "Which team won the NBA title in 2020?",
    options: [
      { answerText: "Los Angeles Lakers", isCorrect: true },
      { answerText: "Miami Heat", isCorrect: false },
      { answerText: "Toronto Raptors", isCorrect: false },
      { answerText: "Boston Celtics", isCorrect: false },
    ],
  },
  {
    questionText: "Which team was the runner-up in the NBA Finals in 2022?",
    options: [
      { answerText: "Boston Celtics", isCorrect: true },
      { answerText: "Golden State Warriors", isCorrect: false },
      { answerText: "Miami Heat", isCorrect: false },
      { answerText: "Milwaukee Bucks", isCorrect: false },
    ],
  },
  {
    questionText: "Which player won the NBA MVP award in 2023?",
    options: [
      { answerText: "Nikola Jokic", isCorrect: false },
      { answerText: "Joel Embiid", isCorrect: true },
      { answerText: "Luka Doncic", isCorrect: false },
      { answerText: "Giannis Antetokounmpo", isCorrect: false },
    ],
  },
  {
    questionText: "Who was the NBA scoring leader in the 2022-2023 season?",
    options: [
      { answerText: "LeBron James", isCorrect: false },
      { answerText: "Kevin Durant", isCorrect: false },
      { answerText: "Joel Embiid", isCorrect: true },
      { answerText: "Stephen Curry", isCorrect: false },
    ],
  },
  {
    questionText: "Which team won the NBA All-Star Game in 2023?",
    options: [
      { answerText: "Team LeBron", isCorrect: false },
      { answerText: "Team Giannis", isCorrect: true },
      { answerText: "Team Durant", isCorrect: false },
      { answerText: "Team Curry", isCorrect: false },
    ],
  },
  {
    questionText:
      "Extra Cridit: did you find the quiz fun ?",
    options: [
      { answerText: "Yes.", isCorrect: true },
      { answerText: "NO", isCorrect: true },
      { answerText: "Too Hard", isCorrect: true },
      { answerText: "I do not like quiz", isCorrect: true },
    ],
  },
];

function Quiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const allQs = questions.length;

  const [currentQ, setCurrentQ] = useState(0);
  const [TheTime, setTheTime] = useState(120);
  const [isQS, setIsQS] = useState(false);

  useEffect(() => {
    let TRuning;
    if (isQS ) {
        TRuning = setInterval( () => {

        setTheTime(( mins) => {
          if (mins <=  1)  {
            clearInterval(TRuning );

            handleSubmit();
            return ;
          }
          return mins- 1;
        });
      }, 1000);
    }
    return () => clearInterval( TRuning);
    
  });



  const startQuiz = () => {
    setIsQS(true);
    setTheTime(120) ;
  };



  const handleAnswerOptionClick = (questionIndex, isCorrect) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = isCorrect;
    setAnswers(newAnswers);

    if (questionIndex < allQs - 1) {
      setCurrentQ(  questionIndex + 1);
    } else  {

      handleSubmit();

    }
  };



  const handleSubmit = () => {
    const newScore = answers.filter((answer) => answer === true).length;
    setScore(newScore);
    setShowResult(true);
   
  
  };




  return (
    <section className="quiz">
      {isQS ? ( 
        <>

       <MyProgressBar currentStep={currentQ + 1} totalSteps={allQs} />

       <p>{`End in  : ${Math.floor(TheTime / 60)}:${TheTime % 60}`}</p>


          {showResult ? (
            <Result score={score} totalQuestions={questions.length} />
          ) : (
            <section>
              <Question
                question={questions[currentQ]}
                questionIndex={currentQ}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />
 <button className="submit-button" onClick={handleSubmit}>  Send  </button>
            </section>
          )}
        </>
      ) : (
        <WelcomeP startQuiz={startQuiz} />  )
        
        }  </section>

  );
}

export default Quiz;
