// in select [admin (add,update product forms) or user search]
import { getCookie } from "../../js/scripts/cookies.js"

function getMainCategories(categContainer, selectedCateg = '') {
    let options = ''

    fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach((categ => {
            if (categ.name == selectedCateg) {
                options += `<option value="${categ.name}" selected>${categ.name}</option>`
            } else {
                options += `<option value="${categ.name}">${categ.name}</option>`
            }
        }))

        let categoriesDiv = ''

        if (getCookie('admin_access_token')) {
            categoriesDiv = `
                        <div class="custom-form-control">
                            <label for="category" class="my-1">Select Main Category</label>
                            <select class="form-control" name="mainCateg" value="${selectedCateg}" id="category">
                                <option value="">Select</option>
                                `
                +
                options
                +
                `</select>
                            <small></small>
                        </div>`
        } else {
            categoriesDiv = `<option value="all-products">كل المنتجات</option>` + options
        }

        categContainer.innerHTML = categoriesDiv
    })
}

export { getMainCategories }