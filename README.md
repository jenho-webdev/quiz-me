# 04 Web APIs: Code Quiz

## About the App

At some point in your journey to become a full-stack web developer, you’ll likely be asked to complete a coding assessment and perhaps as part of an interview process. A typical coding assessment includes both multiple-choice questions and interactive coding challenges.

To help familiarize you with these tests and questions, the app allows you to take a timed multiple-choice quize on JavaScript fundementals. The app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code. It has a clean, polished, and responsive user interface. In the feature release of the app, we planned to add interative coding qustions and updated pool of questions. See roadmap section of this document for more planned features in the coming releases. 

## User Story


    AS A coding boot camp student
    I WANT to take a timed quiz on JavaScript fundamentals that stores high scores locally and that i can review all stored scores and gamers' initials.
   
## Acceptance Criteria

    GIVEN i am taking a code quiz
    WHEN i click the start button
    THEN a timer starts and I am presented with a question
    WHEN i answer a question
    THEN i am presented with another question
    WHEN i answer a question incorrectly
    THEN time is subtracted 5 sec from the clock
    WHEN all 10 questions are answered or the timer reaches 0
    THEN the game is over
    WHEN the game is over
    THEN i can save my initials and my scorce
    WHEN the game save my initials, it verify the input isn't empty.
    THEN if it is empty, alert the me until something is inputted to the initials text field. 
    WHEN there is text/char in the initial text field and I hit the save button
    THEN the game save the user's inital and score into local storage. 
    THEN system provide an alert that save was successful and update screen with option to start a new game or view score.
    WHEN i click on view score button
    THEN it show all user inital and scores saved locally.
    WHEN i click on the Start a New Game button on the view score page
    THEN it start a new game

## Wireframe

![wireframe picture.](./Assets/images/Wireframe%20P1.png)

## Mock-Up

The following animation demonstrates the application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.](./Assets/images/demo.gif)

## Roadmap

- Allow user to select the total number of questions that they will be quiz on in an incremental of 10.
- Instead of using time remaining and -5sec for wrong answer as a scoring system. Develop a more robust scoring system that will scale with different number of questions set.
- Support interactive coding questions
- Include HTML and CSS questions
- support emailing result to user.


## Contact Me

[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/jen-h-202a1723/)
[![Github][Github-shield]](https://github.com/jenho-webdev/Personal-Portfolio)
[![Slack][slack-shield]](https://jenworkspace-as73396.slack.com/archives/C052QLTJQHG)

## Acknowledgments

- Shield and badges used in this markdown document were sourced from [Shields.io](https://shields.io/).
- The site sound clips were provided by UCI Bootcamp Course.
- This website was inspired by UCIBookcamp Week 4 Assignment. The mock-up, user story, acceptance criteria were provided by UCI Bootcamp Full Stack WebDev Course.

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[Github-shield]:https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[slack-shield]:https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white
 