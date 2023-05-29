import { getCookie, setCookie, deleteCookie } from './cookies.js'
import { checkEmail, checkPassword, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('login-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

let data = {};
const userToken = 'user_access_token'
const adminToken = 'admin_access_token'
let redirectTo = 'index.html'

if (getCookie(userToken)) {
    location.href = 'index.html'
} else {
    formElement.addEventListener('submit', event => {
        event.preventDefault();
        console.log("I'm here.")

        let checkEmailReturn = checkEmail(emailInput)
        let checkPassReturn = checkPassword(passwordInput)

        const formData = new FormData(formElement);
        data = Object.fromEntries(formData)

        if (checkEmailReturn && checkPassReturn) {
            fetch(`http://localhost:5000/user/login`, {
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
                        return res.json();
                    } else {
                        setFormError(formElement, emailInput, passwordInput, 'هذا البريد الإلكتروني أو كلمة المرور غير صحيحة. من فضلك ادخل بريد إلكتروني و كلمة مرور صحيحتين أو قم بإنشاء حساب جديد.')
                    }
                })
                .then(data => {
                    if (data) {
                        console.log(data)
                        if (getCookie(adminToken)) {
                            deleteCookie(adminToken, data.token)
                        }
                        setCookie(userToken, data.token)
                        location.href = redirectTo;
                    }
                })
                .catch(err => console.log(err))
        }
    })
}
