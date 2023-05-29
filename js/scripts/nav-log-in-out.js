import { getCookie } from './cookies.js'

/* change nav if log-in | log-out */

function logInOutNav(cookieName) {
    let logOutNav = document.getElementById('logged-in')
    let logInNav = document.getElementById('logged-out')

    if (getCookie(cookieName)) {
        logOutNav.style.display = 'inline';
        logInNav.style.display = 'none';
    } else {
        logOutNav.style.display = 'none';
        logInNav.style.display = 'inline';
    }
}

export { logInOutNav }