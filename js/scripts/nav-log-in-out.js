import { getCookie } from './cookies.js'

/* change nav if log-in | log-out */

function logInOutNav(cookieName) {
    let logOutNav = document.getElementById('logged-in')
    let logInNav = document.getElementById('logged-out')

    if (getCookie(cookieName)) {
        logOutNav.style.display = 'inline';
        logInNav ? logInNav.style.display = 'none' : null;
    } else {
        logOutNav ? logOutNav.style.display = 'none' : null;
        logInNav.style.display = 'inline';
    }
}

export { logInOutNav }