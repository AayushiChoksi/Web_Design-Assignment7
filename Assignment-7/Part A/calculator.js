$(document).ready(function () {
    $("#loginButton").prop("disabled", true);

    function updateLoginButton() {
        var isValid = validateForm();
        $("#loginButton").prop("disabled", !isValid);
    }

    function validateForm() {
        var isValid = true;

        isValid = isValid && checkNull("email") && validateEmail();
        isValid = isValid && checkNull("username") && validateUsername();
        isValid = isValid && checkNull("password") && validatePassword();
        isValid = isValid && checkNull("confirmPassword") && validateConfirmPassword();

        return isValid;
    }

    function checkNull(field) {
        var value = $("#" + field).val();
        if (!value) {
            displayError(field, "Please enter a value for this field.");
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    function validateEmail() {
        var email = $("#email").val();
        var emailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;

        if (!emailRegex.test(email)) {
            displayError("email", "Please enter a valid Northeastern email address.");
            return false;
        } else {
            clearError("email");
            return true;
        }
    }

    function validateUsername() {
        var username = $("#username").val();
        var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (specialCharRegex.test(username)) {
            displayError("username", "Username should not contain special characters.");
            return false;
        } else if (username.length < 4 || username.length > 20) {
            displayError("username", "Username should be between 4 and 20 characters.");
            return false;
        } else {
            clearError("username");
            return true;
        }
    }

    function validatePassword() {
        var password = $("#password").val();

        if (password.length < 5 || password.length > 20) {
            displayError("password", "Password should be between 5 and 20 characters.");
            return false;
        } else {
            clearError("password");
            return true;
        }
    }

    function validateConfirmPassword() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();

        if (password !== confirmPassword) {
            displayError("confirmPassword", "Passwords do not match.");
            return false;
        } else {
            clearError("confirmPassword");
            return true;
        }
    }

    function validateNumericInput(inputValue, fieldName) {
        if (!$.isNumeric(inputValue) || !isFinite(inputValue)) {
            displayError(fieldName, "Please enter a valid, finite number.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }
    

    function displayError(field, message) {
        $("#" + field + "Error").text(message);
    }

    function clearError(field) {
        $("#" + field + "Error").text("");
    }

    $("#email, #username, #password, #confirmPassword").on("input", function () {
        updateLoginButton();
    });

    $("#loginButton").on("click", function () {
        if (validateForm()) {
            var loggedInUser = $("#username").val();
            sessionStorage.setItem("loggedInUser", loggedInUser);

            window.location.href = "calculator.html?username=" + encodeURIComponent(loggedInUser);
        }
    });



    var loggedInUser = getLoggedInUserFromURL();
    $("#loggedInUser").text("Welcome User: " + loggedInUser);

    $("#number1, #number2").on("input", function () {
        var fieldName = $(this).attr("id");
        var inputValue = $(this).val();

        validateNull(inputValue, fieldName);
        validateNumericInput(inputValue, fieldName);
        validateSpecialCharacters(inputValue, fieldName);

        updateOperationButtons();
    });

    $(".operationBtn").on("click", function () {
        var num1 = parseFloat($("#number1").val());
        var num2 = parseFloat($("#number2").val());

        if (
            validateNull($("#number1").val(), "number1") &&
            validateNumericInput(num1, "number1") &&
            validateSpecialCharacters(num1.toString(), "number1") &&
            validateNull($("#number2").val(), "number2") &&
            validateNumericInput(num2, "number2") &&
            validateSpecialCharacters(num2.toString(), "number2")
        ) {
            var operation = $(this).data("operation");
            var result = calculateResult(num1, num2, operation);
            $("#result").val(result);
        }
    });

    function updateOperationButtons() {
        var isValidNumber1 = validateNull($("#number1").val(), "number1") &&
            validateNumericInput(parseFloat($("#number1").val()), "number1") &&
            validateSpecialCharacters($("#number1").val(), "number1");

        var isValidNumber2 = validateNull($("#number2").val(), "number2") &&
            validateNumericInput(parseFloat($("#number2").val()), "number2") &&
            validateSpecialCharacters($("#number2").val(), "number2");

        $(".operationBtn").prop("disabled", !(isValidNumber1 && isValidNumber2));
    }

    var calculateResult = (num1, num2, operation) => {
        switch (operation) {
            case "add":
                return num1 + num2;
            case "subtract":
                return num1 - num2;
            case "multiply":
                return num1 * num2;
            case "divide":
                return num1 / num2;
            default:
                return "Error";
        }
    };

    function getLoggedInUserFromURL() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('username');
    }

    function validateNull(inputValue, fieldName) {
        if (inputValue === "") {
            displayError(fieldName, "This field cannot be empty.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }

    function validateNumericInput(inputValue, fieldName) {
        if (!$.isNumeric(inputValue)) {
            displayError(fieldName, "Only numbers are allowed!");
            return false;
        } else if (!isFinite(inputValue)) {
            displayError(fieldName, "Infinite numbers are not allowed.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }

    function validateSpecialCharacters(inputValue, fieldName) {
        var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
        if (specialCharRegex.test(inputValue)) {
            displayError(fieldName, "Special characters are not allowed.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }
});
