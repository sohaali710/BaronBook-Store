import { getCookie } from './cookies.js'
import { checkTextInputs, checkEmail, checkPassword, checkConfirmPass, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('signup-form');

let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let genderInput = document.getElementById('gender')
let birthdateInput = document.getElementById('birthdate')

let userToken = 'user_access_token'

let data = {};
if (getCookie(userToken)) {
    location.href = 'index.html'
} else {
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
        data = Object.fromEntries(formData)

        delete data['confirm-password']
        console.log(data)

        if (isInputsValid && checkEmailReturn && checkPassReturn && checkConfirmPassReturn) {

            fetch(`http://localhost:5000/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        deleteFormError(formElement)
                        return res.json()
                    } else {
                        setFormError(formElement, 'هذا البريد الإلكتروني مستخدم مسبقًا. من فضلك قم بتسجيل الدخول.', emailInput, passwordInput)
                    }
                })
                .then(data => {
                    console.log(data)
                    if (data) {
                        location.href = `user-login.html`;
                    }
                })
                .catch(err => console.log(err))
        }
    })
}
