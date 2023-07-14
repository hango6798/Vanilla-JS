const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const paddword = document.getElementById('password')
const paddword2 = document.getElementById('password2')

// show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

// check email is valid
function checkEmail(input){
    
    const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }
    else{
        showError(input, `Email is not valid`)
    }
}

//check required
function checkRequired(inputArr){
    let isSuccess
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
            isSuccess = false
        }
        else{
            showSuccess(input)
            isSuccess = true
        }
    });
    return isSuccess
}

// check password
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, `Passwords do not match`)
    }
}

// get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} charaters`)
    }
    else{
        showSuccess(input)
    }
}

// Event Listener
form.addEventListener('submit', function(e){
    e.preventDefault()
    
    checkRequired([username, email, password, password2])

    if(checkRequired([username])){
        checkLength(username, 3, 15)
    }

    if(checkRequired([email])){
        checkEmail(email)
    }

    if(checkRequired([password])){
        checkLength(password, 6, 15)
    }
    if(checkRequired([password]) && checkRequired([password2])){
        checkPasswordMatch(paddword, password2)
    }
})
