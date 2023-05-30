import { getCookie } from './cookies.js'
import { checkUsername, checkEmail, checkPassword, checkConfirmPass, checkGender, checkBirthdate, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('signup-form');

let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let genderInput = document.getElementById('gender')
let birthdateInput = document.getElementById('birthdate')

let cookieName = 'user_access_token'

let data = {};
if (getCookie(cookieName)) {
    location.href = 'index.html'
} else {
    formElement.addEventListener('submit', event => {
        event.preventDefault();

        let checkNameReturn = checkUsername(nameInput)
        let checkEmailReturn = checkEmail(emailInput)
        let checkPassReturn = checkPassword(passwordInput)
        let checkConfirmPassReturn = checkConfirmPass(passwordInput, confirmPassInput)
        let checkGenderReturn = checkGender(genderInput)
        let checkBirthdateReturn = checkBirthdate(birthdateInput)

        const formData = new FormData(formElement);
        data = Object.fromEntries(formData)

        delete data['confirm-password']
        console.log(data)

        if (checkNameReturn && checkEmailReturn && checkPassReturn && checkConfirmPassReturn && checkGenderReturn && checkBirthdateReturn) {

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
