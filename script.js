const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

// Show input error message
function showError(input, errorMsg) {
    const formControl = input.parentElement;
    formControl.classList = 'form-control error';
    
    const errorMsgEl = formControl.querySelector('small');
    errorMsgEl.innerText = errorMsg;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList = 'form-control success';
}

// Check required fields
function checkRequired(inputs) {
    inputs.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check email is valid
function checkEmail(input) {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value.trim())) {
        showError(input, `Email is not valid`); 
    } else {
        showSuccess(input);
    };
}

// Check password match
function checkPasswordMatch(input1, input2) {
    if (input1.value.trim() !== input2.value.trim()) {
        showError(input2,  'Password do not match')
    }
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, confirm]);
    checkLength(username, 4, 18);
    checkLength(password, 6, 12);
    checkEmail(email);

    checkPasswordMatch(password, confirm);
})