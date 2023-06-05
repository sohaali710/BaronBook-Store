// in select [user (add book form)]
import { getCookie } from "./cookies.js"

const userToken = 'user_access_token'

function getSubcategories(subcategContainer, mainCateg, selectedCateg = '') {
    let options = ''

    fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach(categ => {
            const { _id: categId, name: categName } = categ

            if (mainCateg == categName) {
                fetch(`http://localhost:5000/get-subs-by-main/${categId}`).then(res => res.json()).then(data => {
                    data.data.forEach((subcateg => {
                        if (subcateg.name == selectedCateg) {
                            options += `<option value="${subcateg.name}" selected>${subcateg.name}</option>`
                        } else {
                            options += `<option value="${subcateg.name}">${subcateg.name}</option>`
                        }
                    }))

                    let subcategoriesDiv = ''

                    if (userToken) {
                        subcategoriesDiv = `<option value="">Choose</option>` + options

                    }

                    subcategContainer.innerHTML = subcategoriesDiv
                })
            }
        })
    })
}

export { getSubcategories }