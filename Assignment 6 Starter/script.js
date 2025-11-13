/**
 * set and get cookies.
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
    const target = name + "=";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookieEntry = cookies[i].trim();
        if (cookieEntry.indexOf(target) === 0) {
            return cookieEntry.substring(target.length, cookieEntry.length);
        }
    }
    return "";
}


/**
 * Checks if a username cookie exists or not
 */
function checkUserSession() {
    const usernameInput = document.getElementById("username");
    const newPlayerButton = document.getElementById("new-player");

    const savedName = getCookie("username");

    if (savedName) {
        // username exist
        usernameInput.value = savedName;
        newPlayerButton.classList.remove("hidden");
    } else {
        // username is not exist
        usernameInput.value = "";
        newPlayerButton.classList.add("hidden");
    }
}


/**
 * Calculates the user's score based on selected answers.
 */
function calculateScore() {
    let score = 0;

    for (let i = 0; i < 10; i++) {
        const selectedOption = document.querySelector(`input[name="answer${i}"]:checked`);

        if (!selectedOption) {
            continue;
        }

        const isCorrect = selectedOption.getAttribute("data-correct");

        if (isCorrect === "true") {
            score++;
        }
    }

    return score;
}



/**
 * Initializes the Trivia Game when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("trivia-form");
    const questionContainer = document.getElementById("question-container");
    const newPlayerButton = document.getElementById("new-player");

    checkUserSession()



    // Initialize the game
    // checkUsername(); Uncomment once completed
    displayQuestions();
    // displayScores();





    /**
     * Fetches trivia questions from the API and displays them.
     */
    async function fetchQuestions() {
        showLoading(true); // Show loading state
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            if (!response.ok) {
                throw new Error(`HTTP Error: status: ${response.status}`);
            }
            showLoading(false)
            return response.json()
        } catch (error) {
            //  Error handling: log the error message
            console.error("Failed to fetch data, error.message");
            showLoading(false)
        }
    }

    /**
     * Toggles the display of the loading state and question container.
     *
     * @param {boolean} isLoading - Indicates whether the loading state should be shown.
     */
    function showLoading(isLoading) {
        document.getElementById("loading-container").classList = isLoading
            ? ""
            : "hidden";
        document.getElementById("question-container").classList = isLoading
            ? "hidden"
            : "";
    }

    /**
     * Displays fetched trivia questions.
     * @param {Object[]} questions - Array of trivia questions.
     */
    async function displayQuestions() {

        const questions = await fetchQuestions();
        console.log(questions.results)
        questionContainer.innerHTML = ""; // Clear existing questions
        questions.results.forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <p>${question.question}</p>
                ${createAnswerOptions(
                question.correct_answer,
                question.incorrect_answers,
                index
            )}
            `;
            questionContainer.appendChild(questionDiv);
        });
    }

    /**
     * Creates HTML for answer options.
     * @param {string} correctAnswer - The correct answer for the question.
     * @param {string[]} incorrectAnswers - Array of incorrect answers.
     * @param {number} questionIndex - The index of the current question.
     * @returns {string} HTML string of answer options.
     */
    function createAnswerOptions(
        correctAnswer,
        incorrectAnswers,
        questionIndex
    ) {
        const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
            () => Math.random() - 0.5
        );
        return allAnswers
            .map(
                (answer) => `
            <label>
                <input type="radio" name="answer${questionIndex}" value="${answer}" ${answer === correctAnswer ? 'data-correct="true"' : ""
                    }>
                ${answer}
            </label>
        `
            )
            .join("");
    }

    // Event listeners for form submission and new player button
    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const usernameInput = document.getElementById("username")
        const username = usernameInput.value.trim();

        // 1. Check if the username is empty.
        if (!username) {
            alert("Please enter your name before submitting.");
            return;
        }

        // 2. If the cookie does not yet have this username, then save a cookie use this username.
        const existingCookie = getCookie("username");
        if (!existingCookie) {
            setCookie("username", username, 7);
        } 

        checkUserSession();

        const score = calculateScore();
        console.log("Score:", score);
    });

    
    
    newPlayerButton.addEventListener("click", (event) => {

    })


});

