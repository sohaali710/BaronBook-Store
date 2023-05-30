import { getCookie } from '../../js/scripts/cookies.js'
import { checkCategName, checkCategImg } from '../../js/scripts/form-validation.js'

let adminToken = 'admin_access_token'

let addCategForm = document.getElementById('add-main-category-form')
let categoryNameInput = document.querySelector('#add-main-category-form #name')
let categImgInput = document.querySelector('#add-main-category-form #exampleInputFile')
let categImg = document.querySelector('#add-main-category-form .categ-img')

let addSubcategForm = document.getElementById('add-subcategory-form')
let subcategoryNameInput = document.querySelector('#subcateg-name')

let filterByCategCol = document.getElementById('category')

if (getCookie(adminToken)) {
    // #region add main category
    addCategForm.addEventListener('submit', event => {
        event.preventDefault();

        checkCategName(categoryNameInput)
        checkCategImg(categImgInput)


        let formData = new FormData(addCategForm);
        let data = Object.fromEntries(formData)
        console.log(data)

        const myHeaders = new Headers();

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        }

        delete options.headers['Content-Type'];
        myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);


        fetch('http://localhost:5000/admin/add-main-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    // getCategories(filterByCategCol)
                    console.log(res.data.img)
                    return res.json();
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))

    })
    // #endregion add main category

    // #region add subcategory
    addSubcategForm.addEventListener('submit', event => {
        event.preventDefault();

        checkCategName(subcategoryNameInput)


        let formData = new FormData(addSubcategForm);
        let data = Object.fromEntries(formData)
        console.log(data)

        const myHeaders = new Headers();

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        }

        // delete options.headers['Content-Type'];
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);


        fetch('http://localhost:5000/admin/add-sub-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    // getCategories(filterByCategCol)
                    return res.json();
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))

    })
    // #endregion add subcategory
} else {
    location.href = 'admin-login.html'
}