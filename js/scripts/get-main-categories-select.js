// in select [user (add book form)]
import { getCookie } from "./cookies.js"

const userToken = 'user_access_token'

function getMainCategories(categContainer, selectedCateg = '') {
    let options = ''

    fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach(categ => {
            if (categ.name == selectedCateg) {
                options += `<option value="${categ.name}" selected>${categ.name}</option>`
            } else {
                options += `<option value="${categ.name}">${categ.name}</option>`
            }
        })

        let categoriesDiv = ''

        if (userToken) {
            categoriesDiv = `<option value="">Choose</option>` + options
        }

        categContainer.innerHTML = categoriesDiv
    })
}

export { getMainCategories }