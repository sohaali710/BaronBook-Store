// in select [admin (add subcategory forms)]
import { getCookie } from "../../js/scripts/cookies.js"

function getMainCategories(categContainer, selectedCateg = '') {
    let checkItems = ''

    fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach((categ => {
            if (categ.name == selectedCateg) {
                checkItems += `
                    <label>
                        <input type="checkbox" selected value="${categ._id}" name="${categ.name}">
                        ${categ.name}
                    </label>`

            } else {
                checkItems += `
                    <label>
                        <input type="checkbox" value="${categ._id}" name="${categ.name}">
                        ${categ.name}
                    </label>`
            }
        }))

        let categoriesDiv = ''

        if (getCookie('admin_access_token')) {
            categoriesDiv = `
            <div class="custom-form-control">
            <label for="category" class="my-1">Select Main Category</label>
            <div class="checkbox" id="category">
                        `
                +
                checkItems
                +
                `</div>
                <small></small>
                        </div>`
        }
        // else {
        //     categoriesDiv = `<option value="all-products">كل المنتجات</option>` + checkItems
        // }

        categContainer.innerHTML = categoriesDiv
    })
}

export { getMainCategories }