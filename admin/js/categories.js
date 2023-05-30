import { getCookie } from '../../js/scripts/cookies.js'
import { checkCategName, checkCategImg, setFormError, deleteFormError } from '../../js/scripts/form-validation.js'

const adminToken = 'admin_access_token'

let addCategForm = document.getElementById('add-main-category-form')
let categoryNameInput = document.getElementById('categ-name')
let categImgInput = document.getElementById('categ-img')
let categAlert = document.querySelector('.categ-added')
// let categImg = document.querySelector('#add-main-category-form .categ-img')


// let filterByCategCol = document.getElementById('category')

// redirect to login
!getCookie(adminToken) ? location.href = 'admin-login.html' : null;

// #region add main category
addCategForm.addEventListener('submit', event => {
    event.preventDefault();

    let checkCategNameReturn = checkCategName(categoryNameInput)
    let checkCategImgReturn = checkCategImg(categImgInput)


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

    const addedSuccessfullyAlert = `
    <div class="alert alert-warning alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4> <i class="icon fa fa-check"></i> Alert!</h4>
        Category added successfully
    </div>`


    if (checkCategNameReturn && checkCategImgReturn) {
        fetch('http://localhost:5000/admin/add-main-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    // getCategories(filterByCategCol)
                    deleteFormError(addCategForm)
                    categAlert.innerHTML = addedSuccessfullyAlert

                    console.log(res.data.img)

                    return res.json();
                } else {
                    setFormError(addCategForm, 'هذا القسم موجود بالفعل.', categoryNameInput, categImgInput)
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
})
// #endregion add main category


// #region add subcategory
let addSubcategForm = document.getElementById('add-subcategory-form')
let subcategoryNameInput = document.querySelector('#subcateg-name')
let subcategAlert = document.querySelector('.subcateg-added')

addSubcategForm.addEventListener('submit', event => {
    event.preventDefault();

    let checkCategNameReturn = checkCategName(subcategoryNameInput)


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

    const addedSuccessfullyAlert = `
    <div class="alert alert-warning alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4> <i class="icon fa fa-check"></i> Alert!</h4>
        Subcategory added successfully
    </div>`


    if (checkCategNameReturn) {
        fetch('http://localhost:5000/admin/add-sub-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    // getCategories(filterByCategCol)
                    deleteFormError(addSubcategForm)
                    subcategAlert.innerHTML = addedSuccessfullyAlert

                    return res.json();
                } else {
                    setFormError(addSubcategForm, 'هذا القسم موجود بالفعل.', subcategoryNameInput)
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

})
    // #endregion add subcategory
