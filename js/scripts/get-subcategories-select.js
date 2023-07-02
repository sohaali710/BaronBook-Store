// in select [user (add book form)]
import { getCookie } from "./cookies.js"

const userToken = 'user_access_token'

function getSubcategories(subcategContainer, mainCateg, selectedCateg = '') {
    let options = ''

    fetch(`http://191.101.232.235/api/get-subs-by-main/${mainCateg}`).then(res => res.json()).then(data => {
        data.data.forEach(subcateg => {
            const { _id: subId, name: subName } = subcateg
            if (subName == selectedCateg) {
                options += `<option value="${subId}" selected>${subName}</option>`
            } else {
                options += `<option value="${subId}">${subName}</option>`
            }
        })

        let subcategoriesDiv = ''

        if (userToken) {
            subcategoriesDiv = `<option value="">Choose</option>` + options
        }

        subcategContainer.innerHTML = subcategoriesDiv
    })
}

export { getSubcategories }