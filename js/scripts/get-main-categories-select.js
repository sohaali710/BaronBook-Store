// in select [user (add book form)]
import { getCookie } from "./cookies.js"

function getMainCategories(categContainer, selectedCateg = '') {
    let options = ''
    let categoriesDiv = ''

    fetch('http://191.101.232.235/api/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach(categ => {
            const { _id: categId, name: categName } = categ

            fetch(`http://191.101.232.235/api/get-subs-by-main/${categId}`).then(res => res.json()).then(data => {
                console.log(data.data.length)
                if (data.data.length) {
                    if (categName == selectedCateg) {
                        options += `<option value="${categId}" selected>${categName}</option>`
                    } else {
                        options += `<option value="${categId}">${categName}</option>`
                    }
                }

                categoriesDiv = `<option value="">Choose</option>` + options

                categContainer.innerHTML = categoriesDiv
            })
        })

    })
}

export { getMainCategories }