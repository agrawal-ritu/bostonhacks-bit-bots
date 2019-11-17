import React from "react";
import Card from "react-bootstrap/Card";
import "./Question.css";

const questionCard = {
  "background-color": "rgba(255,255,255,0)",
  border: "none",
  "border-radius": "5px",
  "min-width": "360px",
  "min-height": "20rem",
  height: "35vh",
  width: "35vw",
  "margin-left": "auto",
  "margin-right": "auto",
  "align-items": "center"
};

const questions = {
  "1":`Welcome to the 18Q Quiz! Ready to get started?`,
  "2":`What is your name?`,
  "3":`Please enter your supervisor's code...`,
  "3.1":`Select continue if this does not apply to you.`,
  "4":`Please enter your partner's code...`,
  "4.1":`Your own code is: `,
  "5": `What is your first impression of the person in front of you?`,
  "5.1": `Keep this response to yourself. You do not need to share it until the end.`,
  "6": `What constitutes an ideal day for you?`,
  "7": `What’s one thing that you haven’t done yet and would like to do?`,
  "8": `What’s your favourite thing about the place you call home?`,
  "9": `What social issue are you passionate about?`,
  "10": `If you didn’t have to worry about money, what would you want to do? `,
  "11": `Who or what motivates you in life?`,
  "12": `What is the most valuable lesson you have ever learned?`,
  "13": `If you could change one thing about yourself, what would it be and why?`,
  "14": `How would you want people to describe you?`,
  "15": `What was the easiest and the most challenging thing about being a teenager?`,
  "16": `What is an important relationship in your life, and why?`,
  "17": `Describe a time when you felt that you did not belong.`,
  "18": `Are you happy with the way people like you are represented in the media?`,
  "19": `What is one thing people assume about you?`,
  "20": `What is a moment that you are not proud of?`,
  "21": `How is the person in front of you similar to or different from people you usually hangout with?`,
  "22": `Considering all the conversations you’ve just had, how has your perception of the person in front of you changed?`,
  "23": `Do you feel as though this experience has affected your relationship with the other person?`,
  "24": `How do you feel about the 18Q process?`,
  "25": `Thank you for participating! Your feedback has been recorded.`,
  "25.1": `You can now close your browser or tab...`
}

const animationClasses = {
  0: "slide-left-bounce",
  1: "slide-right-bounce",
  2: "slide-up-bounce",
  3: "slide-down-bounce",
  4: "fade-in-sm",
  5: "fade-in-md",
  6: "fade-in-lg",
  7: "heartbeat-sm",
  8: "heartbeat-lg",
  9: "twist",
  10: "squeeze"
};

const fadeOutAnimationClasses = {
  0: "slide-out-up-bounce",
  1: "slide-out-down-bounce",
  2: "slide-out-right-bounce",
  3: "slide-out-left-bounce"
};

let previousFadeInAnimationNumber = -1;
let previousFadeOutAnimationNumber = -1;
var toggle;

function getAnimationNumber(animationClassRange, previousAnimationNumber) {
  let animationNumber = Math.floor(Math.random() * animationClassRange);
  while (animationNumber === previousAnimationNumber) {
    animationNumber = Math.floor(Math.random() * animationClassRange);
  }
  return animationNumber;
}

function getQuestion(questionNumber) {
  return questions[questionNumber] || questions["0"];
}

function getFadeInAnimationClass(hasNotTog) {
  if(hasNotTog) {
    return "";
  }
  const animationNumber = getAnimationNumber(
    Object.keys(animationClasses).length,
    previousFadeInAnimationNumber
  );
  previousFadeInAnimationNumber = animationNumber;
  toggle = !toggle;

  return animationClasses[animationNumber];
}

function getFadeOutAnimationClass() {
  const animationNumber = getAnimationNumber(
    Object.keys(fadeOutAnimationClasses).length,
    previousFadeOutAnimationNumber
  );
  previousFadeOutAnimationNumber = animationNumber;
  console.log("fade " + animationNumber);
  return fadeOutAnimationClasses[animationNumber];
}

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    toggle = this.props.qToggle
  }
  //the idea is that there was an issue that whenever state was updated,
  //the question would reanimate, and changing what's in the responseBox
  //updates the state (even though the question doesn't update)
  //so check if the question has been updated (toggled in game)
  lastSame() {
    if (this.props.qToggle == toggle) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Card id="questions" style={questionCard}>
        <div class="overlap">
          <div class={getFadeOutAnimationClass()}>
            {/*if the question changed then display it, otherwise don't display the fade out animation*/}
            <h2 class="questionText">{!this.lastSame()? getQuestion(this.props.question - 1) : ""}</h2>
          </div>
          <div class="slide-out-up-bounce">
            <p class="subquestionText">
              {(this.props.question -1 === 4)
                ? getQuestion(this.props.question - 1 + ".1")
                : ""}
            </p>
          </div>
        </div>
        <div class="overlap">
          <div class={getFadeInAnimationClass(this.lastSame())}>
            <h2 class="questionText">{getQuestion(this.props.question)}</h2>
          </div>
          <div class="slide-down-bounce">
            <p class="subquestionText">
              {(this.props.question === 1)
                ? getQuestion(this.props.question + ".1")
                : ""}
            </p>
          </div>
        </div>
      </Card>
    );
  }
}
