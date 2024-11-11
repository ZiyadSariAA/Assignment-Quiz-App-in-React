import React from 'react';
function WelcomeP({startQuiz}) {
    return (
        <div >
            <h1>Welcome to my  Quiz</h1>
            <button onClick={startQuiz}>Start</button>
        </div>
    );
}

export default WelcomeP;
