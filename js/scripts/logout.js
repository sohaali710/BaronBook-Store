import { getCookie, deleteCookie } from "./cookies.js";
import { logInOutNav } from "./nav-log-in-out.js";

let logOutBtn = document.getElementById('logout')

let userToken = 'user_access_token'
let adminToken = 'admin_access_token'

let redirectTo = ''

if (getCookie(userToken)) {
    logInOutNav(userToken)
} else if (getCookie(adminToken)) {
    logInOutNav(adminToken)
}

logOutBtn.addEventListener('click', event => {
    if (getCookie(userToken)) {
        deleteCookie(userToken)
        location.href = 'user-login.html'
    } else if (getCookie(adminToken)) {
        deleteCookie(adminToken)
        location.href = 'admin-login.html'
    }
})