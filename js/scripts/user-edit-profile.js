import { getCookie } from './cookies.js'
import { checkTextInputs, checkEmail, checkPassword, checkConfirmPass, setFormError, deleteFormError } from './form-validation.js'

const userToken = 'user_access_token'

// redirect to login
!getCookie(userToken) ? location.href = 'user-login.html' : null;

const formElement = document.getElementById('update-profile-form');

let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let genderInput = document.getElementById('gender')
let birthdateInput = document.getElementById('birthdate')


/** assign saved data to the inputs*/
assignDataToInputs()
function assignDataToInputs() {
    const myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${getCookie(userToken)}`);

    fetch('http://localhost:5000/user/user-data', {
        method: 'GET',
        headers: myHeaders
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            const { name, email, gender, birthdate, books } = data.data

            nameInput.value = name
            emailInput.value = email
            genderInput.value = gender
            birthdateInput.value = birthdate.split('T')[0]
        });
}


formElement.addEventListener('submit', event => {
    event.preventDefault();

    const checkEmailReturn = checkEmail(emailInput)
    const checkPassReturn = checkPassword(passwordInput)
    const checkConfirmPassReturn = checkConfirmPass(passwordInput, confirmPassInput)

    const textInputsValidation = checkTextInputs([
        nameInput,
        // genderInput,
        birthdateInput
    ])
    const isInputsValid = textInputsValidation.every(inputValid => inputValid)


    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData)

    delete data['confirm-password']


    const myHeaders = new Headers();

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    }

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(userToken)}`);

    const addedSuccessfullyAlert = `
    <div class="alert alert-success alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4> <i class="icon fa fa-check"></i> Alert!</h4>
        Book added successfully
    </div>`

    if (isInputsValid && checkEmailReturn && checkPassReturn && checkConfirmPassReturn) {

        fetch(`http://localhost:5000/user/edit-user-data`, options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    deleteFormError(formElement)
                    assignDataToInputs()
                    return res.json()
                } else {
                    setFormError(formElement, 'هذا البريد الإلكتروني مستخدم مسبقًا. من فضلك قم بتسجيل الدخول.', emailInput, passwordInput)
                }
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }
})
