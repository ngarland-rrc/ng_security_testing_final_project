const userSurveyNode = document.querySelector("#user-survey");

userSurveyNode.addEventListener("submit", (eventObj) => {
    eventObj.preventDefault();

    const inputsAreValid = validateUserSurvey();

    if (inputsAreValid) {
        userSurveyNode.submit();
    } else {
        console.warn("Invalid inputs");
    }
});

function validateUserSurvey() {

    const errorMessageNodes = document.querySelectorAll(".input-error");
    errorMessageNodes.forEach((n) => n.remove());

    let inputsAreValid = true;

    // Validate First Name
    const firstNameInputNode = document.querySelector("#first-name_field");
    const firstNameInputValue = escapeHTML(firstNameInputNode.value);

    const firstNameValidation = validateFirstName(firstNameInputValue, firstNameInputNode);
    if (!firstNameValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (firstNameValidation["errorMessages"].length > 0) {
        firstNameValidation["errorMessages"].forEach(message => {
            displayInputError(firstNameInputNode, message)
        });
    }

    // Validate Last Name
    const lastNameInputNode = document.querySelector("#last-name_field");
    const lastNameInputValue = escapeHTML(lastNameInputNode.value);

    const lastNameValidation = validateLastName(lastNameInputValue, firstNameInputNode);
    if (!lastNameValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (lastNameValidation["errorMessages"].length > 0) {
        lastNameValidation["errorMessages"].forEach(message => {
            displayInputError(lastNameInputNode, message)
        });
    }

    // Validate Email
    const emailInputNode = document.querySelector("#email_field");
    const emailInputValue = escapeHTML(emailInputNode.value);

    const emailValidation = validateEmail(emailInputValue, emailInputNode);
    if (!emailValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (emailValidation["errorMessages"].length > 0) {
        emailValidation["errorMessages"].forEach(message => {
            displayInputError(emailInputNode, message)
        });
    }

    // Validate Birthdate
    const birthDateInputNode = document.querySelector("#birthdate_field");
    const birthDateInputValue = birthDateInputNode.value;

    const birthDateValidation = validateBirthDate(birthDateInputValue, birthDateInputNode);
    if (!birthDateValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (birthDateValidation["errorMessages"].length > 0) {
        birthDateValidation["errorMessages"].forEach(message => {
            displayInputError(birthDateInputNode, message)
        });
    }

    // Validate Gender
    const genderInputNodes = document.querySelectorAll("input[name='gender']");
    const genderValidation = validateRadioButtons(genderInputNodes);

    if (!genderValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (genderValidation["errorMessages"].length > 0) {
        genderValidation["errorMessages"].forEach(message => {
            displayInputError(genderInputNodes[0], message);
        })
    }

    // Validate Hotdog Question
    const hotdogInputNodes = document.querySelectorAll("input[name='answer']");
    const hotdogValidation = validateRadioButtons(hotdogInputNodes);

    if (!hotdogValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (hotdogValidation["errorMessages"].length > 0) {
        hotdogValidation["errorMessages"].forEach(message => {
            displayInputError(hotdogInputNodes[0], message);
        })
    }

    // Validate Condiment Question
    const condimentInputNodes = document.querySelectorAll("input[name='condiment']");
    const condimentValidation = validateCheckboxes(condimentInputNodes);

    if (!condimentValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (condimentValidation["errorMessages"].length > 0) {
        condimentValidation["errorMessages"].forEach(message => {
            displayInputError(condimentInputNodes[0], message);
        })
    }

    return inputsAreValid;

}

// First Name Validation Rules
function validateFirstName(input) {
    let validFirstName = true;
    const errorMessages = [];
    const invalidChars = /[!@#$%^&*()\-_=+{}\[\]|\\:;"'<>,.?/~`]/
    const invalidNames = ["admin", "test", "user", "guest"];
    const numberRegex = /\d/;

    if (input.trim().length < 3) {
        validFirstName = false;
        errorMessages.push("First name must be at least 3 characters.");
    }

    if (input.trim().length > 20) {
        validFirstName = false;
        errorMessages.push("First name cannot have more then 20 characters.");
    }

    if (invalidChars.test(input)) {
        validFirstName = false;
        errorMessages.push("First name cannot contain special characters.");
    }

    if (input.charAt(0) !== input.charAt(0).toUpperCase()) {
        validFirstName = false;
        errorMessages.push("First name must start with a capital letter.");
    }

    if (invalidNames.includes(input.toLowerCase())) {
        validFirstName = false;
        errorMessages.push("Please enter a valid first name.");
    }

    if (numberRegex.test(input)) {
        validFirstName = false;
        errorMessages.push("First name cannot contain numbers.");
    }

    if (/\s/.test(input)) {
        validFirstName = false;
        errorMessages.push("First name cannot contain spaces.");
    }

    return {
        isValid: validFirstName,
        errorMessages: errorMessages,
    };
}

//Last Name Validation Rules
function validateLastName(input) {
    let validLastName = true;
    const errorMessages = [];
    const invalidChars = /[!@#$%^&*()\-_=+{}\[\]|\\:;"'<>,.?/~`]/
    const invalidNames = ["admin", "test", "user", "guest"];
    const numberRegex = /\d/;

    if (input.trim().length < 3) {
        validLastName = false;
        errorMessages.push("Last name must be at least 3 characters.");
    }

    if (input.trim().length > 20) {
        validLastName = false;
        errorMessages.push("Last name cannot have more then 20 characters.");
    }

    if (invalidChars.test(input)) {
        validLastName = false;
        errorMessages.push("Last name cannot contain special characters.");
    }

    if (input.charAt(0) !== input.charAt(0).toUpperCase()) {
        validLastName = false;
        errorMessages.push("Last name must start with a capital letter.");
    }

    if (invalidNames.includes(input.toLowerCase())) {
        validLastName = false;
        errorMessages.push("Please enter a valid last name.");
    }

    if (numberRegex.test(input)) {
        validLastName = false;
        errorMessages.push("Last name cannot contain numbers.");
    }

    if (/\s/.test(input)) {
        validLastName = false;
        errorMessages.push("Last name cannot contain spaces.");
    }


    return {
        isValid: validLastName,
        errorMessages: errorMessages,
    };
}

// Email Validation Rules
function validateEmail(input) {
    let validEmail = true;
    const errorMessages = [];
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const invalidChars = /[!#$%^&*()]/;

    const emailFollowsPattern = emailPattern.test(input);
    if (!emailFollowsPattern) {
        validEmail = false;
        errorMessages.push("Please provide a valid email.")
    }

    if (/\s/.test(input)) {
        validEmail = false;
        errorMessages.push("Email address cannot contain spaces.");
    }

    if (invalidChars.test(input)) {
        validEmail = false;
        errorMessages.push("Email address contains invalid characters.");
    }

    return { isValid: validEmail, errorMessages: errorMessages };
}

// Birthdate Validation Rules
function validateBirthDate(input) {
    let validBirthDate = true;
    const errorMessages = [];
    const birthDate = new Date(input);
    const currentDate = new Date();

    if (birthDate > currentDate) {
        validBirthDate = false;
        errorMessages.push("Birthdate cannot be in the future.")
    }

    if (input.trim() === "") {
        validBirthDate = false;
        errorMessages.push("Birthdate cannot be empty.")
    }

    return { isValid: validBirthDate, errorMessages: errorMessages };
}

// Radio Button Validation Rule
function validateRadioButtons(nodes) {
    let anySelected = false;
    const errorMessages = [];

    nodes.forEach(n => {
        if (n.checked) {
            anySelected = true;
        }
    });

    if (!anySelected) {
        errorMessages.push("Please select an option.")
    }

    return { isValid: anySelected, errorMessages: errorMessages };
}

// Checkbox Validation Rule
function validateCheckboxes(nodes) {
    let anySelected = false;
    const errorMessages = [];

    nodes.forEach(n => {
        if (n.checked) {
            anySelected = true;
        }
    });

    if (!anySelected) {
        errorMessages.push("Please select an option.")
    }

    return { isValid: anySelected, errorMessages: errorMessages };
}



/**
 * Appends error message node to parent node of field
 * @param {HTMLElement} inputElement - the node of the field with a validation error
 * @param {String} message - the text to be appended 
 */
function displayInputError(inputElement, message) {
    const inputParentNode = inputElement.closest(".input-container");
    const errorDisplayNode = document.createElement("span");
    errorDisplayNode.textContent = message;
    errorDisplayNode.classList.add("input-error");

    errorDisplayNode.setAttribute("role", "alert");

    inputParentNode.appendChild(errorDisplayNode);
}