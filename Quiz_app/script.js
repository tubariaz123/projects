const questions =[
    {
        question:"Which HTML attribute is used to specify the source of an image?" ,
        answers:[
            { text: "alt" , correct:false},
            { text: "src" , correct:true},
            { text: "title" , correct:false},
            { text: "href" , correct:false},


        ]
    },
    {
        question:"What is the purpose of the <table> tag in HTML" ,
        answers:[
            { text: "To define a table" , correct:true},
            { text: "To define a list" , correct:false},
            { text: "To define a paragraph" , correct:false},
            { text: "To define a hyperlink" , correct:false},


        ]
    },

    {
        question:"Which CSS property is used to set the font size?" ,
        answers:[
            { text: "font-family" , correct:false},
            { text: "font-weight" , correct:false},
            { text: "font-size" , correct:true},
            { text: "text-align" , correct:false},


        ]
    },

    {
        question:"Which CSS property is used to set the color of the text?" ,
        answers:[
            { text: "font-style" , correct:false},
            { text: "background-color" , correct:false},
            { text: "background" , correct:false},
            { text: "color" , correct:true},


        ]

    },

    {
        question:"What is the purpose of the display property in css?" ,
        answers:[
            { text: "To set the visibility of an element" , correct:false},
            { text: "To set the position of an element" , correct:false},
            { text: "To set the display type of an element" , correct:true},
            { text: "To set the size of an element" , correct:false},


        ]
    }

]

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

}


function showQuestion() {
    resetState()
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex +1;
   questionElement.innerHTML = questionNo + "." + currentQuestion.question;

   currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML= answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)

   })
}
function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled= "true"
    })

    nextButton.style.display= "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again"
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz();
