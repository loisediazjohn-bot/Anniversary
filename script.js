// =============================
// Grab HTML objects
// =============================
emailjs.init("y343tQhuE1DZi8DVY");
const text = document.getElementById("text");

const input = document.getElementById("answer");

const button = document.getElementById("next");

const character = document.getElementById("character");

// These will be added to HTML later
const availableBtn = document.getElementById("available");
const notAvailableBtn = document.getElementById("notAvailable");

// =============================
// CHARACTER ANIMATION
// =============================

// Character starts idle
character.classList.add("idle");

// Play happy animation for one second
function playHappyAnimation(callback){

    character.classList.remove("idle");
    character.classList.add("happy");

    setTimeout(function(){

        character.classList.remove("happy");
        character.classList.add("idle");

        if(callback){
            callback();
        }

    },1000);

}

// =============================
// STORE ANSWERS
// =============================

let answers = {};

// =============================
// DIALOGUE
// =============================

const dialogue = [

    {
        id:"intro1",
        text:"Hello! My name is Reginald! Remember me?"
    },

    {
        id:"intro2",
        text:"Your snow fox in Minecraft, your first pet?"
    },

    {
        id:"intro3",
        text:"It's fine if you do, just saying."
    },

    {
        id:"intro4",
        text:"You see, Master Loise asked me to ask you a couple of questions."
    },

    {
        id:"availability",
        text:"But first, I need to know your availability later tonight, July 1, 2026, around 8-ish to 9-ish.",
        choice:true
    },

    {
        id:"availableGreat",
        text:"Great!"
    },

    {
        id:"notAvailableReason",
        text:"When are you available then?",
        input:true,
        answerKey:"availableTime"
    },

    {
        id:"location",
        text:"Any location you wanna go?",
        input:true,
        answerKey:"location"
    },

    {
        id:"food",
        text:"What about food? What food do you want?",
        input:true,
        answerKey:"food"
    },

    {
        id:"request",
        text:"Any request?",
        input:true,
        answerKey:"request"
    },

    {
        id:"awesome",
        text:"GREAT! It seems like this would be awesome!"
    },

    {
        id:"lastThing",
        text:"One last thing, my master told me to tell you."
    },

    {
        id:"anniversary",
        text:"HAPPY 1 YEAR!!! MY OTHER MASTER!",
        happyOnly:true
    },

    {
        id:"love",
        text:"He loves you very much, and I think he should be the one telling you more."
    },

    {
        id:"reply",
        text:"Anyways that's that, anything you wanna say?",
        input:true,
        answerKey:"reply"
    },

    {
        id:"end",
        text:"GREAT! THANK YOU FOR ANSWERING THIS!"
    }

];

// Current dialogue index

let current = 0;

// =============================
// SHOW DIALOGUE
// =============================

function showDialogue(){

    const currentDialogue = dialogue[current];

    // Change text

    text.innerHTML = currentDialogue.text;

    // -------------------------
    // Character Animation
    // -------------------------

    if(currentDialogue.happyOnly){

        character.classList.remove("idle");
        character.classList.add("happy");

    }

    else{

        character.classList.remove("happy");
        character.classList.add("idle");

    }

    // -------------------------
    // Input
    // -------------------------

    if(currentDialogue.input){

        input.style.display = "block";

        input.value = "";

    }

    else{

        input.style.display = "none";

    }

    // -------------------------
    // Choice Buttons
    // -------------------------

    if(currentDialogue.choice){

    choices.style.display = "block";

    button.style.display = "none";

}

else{

    choices.style.display = "none";

    button.style.display = "inline-block";

}

}

// =============================
// CONTINUE BUTTON
// =============================

button.onclick = function(){

    const currentDialogue = dialogue[current];

    // -------------------------
    // Save typed answer
    // -------------------------

    if(currentDialogue.input){

        answers[currentDialogue.answerKey] = input.value;

        // Play happy animation first,
        // then continue to next dialogue

        playHappyAnimation(function(){

            current++;

            showDialogue();

        });

        return;

    }

    // -------------------------
    // Normal dialogue
    // -------------------------

    current++;

    // End

    if(current >= dialogue.length){

        finishSurvey();

        return;

    }

    showDialogue();

};

// =============================
// AVAILABLE BUTTON
// =============================

availableBtn.onclick = function(){

    answers.availability = "Available";

    // Skip directly to "Great!"

    current = 5;

    showDialogue();

};

// =============================
// NOT AVAILABLE BUTTON
// =============================

notAvailableBtn.onclick = function(){

    answers.availability = "Not Available";

    // Ask for another time

    current = 6;

    showDialogue();

};

// =============================
// AFTER "WHEN ARE YOU AVAILABLE"
// CONTINUE TO LOCATION
// =============================

const originalPlayHappy = playHappyAnimation;

playHappyAnimation = function(callback){

    character.classList.remove("idle");

    character.classList.add("happy");

    setTimeout(function(){

        character.classList.remove("happy");

        character.classList.add("idle");

        // Special branch

        if(dialogue[current].id == "notAvailableReason"){

            current = 7;

        }

        // Normal next dialogue

        else{

            current++;

        }

        // Finished?

        if(current >= dialogue.length){

            finishSurvey();

            return;

        }

        showDialogue();

    },1000);

};

// =============================
// FINISH
// =============================
function sendEmail(){

    console.log("Sending...", answers);

    emailjs.send(
        "service_u290e8p",
        "template_g2yu27g",
        answers
    )
    .then(function(response){

        console.log("Email sent!", response);

    })
    .catch(function(error){

        console.error("Email failed:", error);

    });

}

function finishSurvey(){

    text.innerHTML = "Thank you!";

    input.style.display = "none";

    button.style.display = "none";

    availableBtn.style.display = "none";

    notAvailableBtn.style.display = "none";

    console.log(answers);

    sendEmail();

}

// =============================
// PDF TEMPLATE
// =============================

function generatePDF(){

    /*
    Later we'll use jsPDF.

    Example:

    Name:
    Location:
    Food:
    Request:
    Reply:

    */

}

// =============================
// START
// =============================

showDialogue();