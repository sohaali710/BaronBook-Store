import { getCookie, deleteCookie } from "./cookies.js";
import { logInOutNav } from "./nav-log-in-out.js";

const logOutBtn = document.getElementById('logout')

const userToken = 'user_access_token'
const adminToken = 'admin_access_token'

let redirectTo = ''

if (getCookie(userToken) && !getCookie(adminToken)) {
    logInOutNav(userToken)
}
// else if (getCookie(adminToken)) {
//     logInOutNav(adminToken)
// }

logOutBtn.addEventListener('click', event => {
    if (getCookie(userToken)) {
        deleteCookie(userToken)
        location.href = 'user-login.html'
    }

    if (getCookie(adminToken)) {
        deleteCookie(adminToken)
        location.href = 'admin-login.html'
    }
})