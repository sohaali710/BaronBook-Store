// get user data [user profile page]
import { getCookie } from "./cookies.js"

const userToken = 'user_access_token'

// redirect to login
!getCookie(userToken) ? location.href = 'user-login.html' : null;

function userProfile(container) {
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

            let booksList = ''
            if (books.length) {
                booksList += books.map(book => {
                    `<li><span data-lang="userBooks">الكتب التي أضفتها : </span>${book.name}</li>`
                })
            }

            container.innerHTML = `
            <li><span data-lang="userName">الاسم : </span>${name}</li>
            <li><span data-lang="userEmail">الإيميل : </span>${email}</li>
            <li><span data-lang="userGender">النوع : </span>${gender}</li>
            <li><span data-lang="userBirthdate">تاريخ الميلاد : </span>${birthdate.split('T')[0]}</li>`
                + booksList

            // console.log(container)
        })
}

const userProfileContainer = document.querySelector('.userProfileContainer ul')
userProfile(userProfileContainer)