import { getCookie } from '../../js/scripts/cookies.js'
import { checkCategName, checkCategImg, setFormError, deleteFormError, checkSelectCateg, checkTextInputs, checkCheckBoxInputs } from '../../js/scripts/form-validation.js'
import { getCategoriesAccordion } from './get-categories-accordion.js'
import { getMainCategories } from './get-main-categories.js'

const adminToken = 'admin_access_token'

let addCategForm = document.getElementById('add-main-category-form')
let categoryNameInput = document.getElementById('categ-name')
let categImgInput = document.getElementById('categ-img')
let categAlert = document.querySelector('.categ-added')

// redirect to login
!getCookie(adminToken) ? location.href = 'admin-login.html' : null;

// #region all main categories
const mainCategoriesContainer = document.querySelector('.main-categories')
let categContainer = document.querySelector('#accordion')

document.addEventListener('DOMContentLoaded', () => {
    getMainCategories(mainCategoriesContainer)
    getCategoriesAccordion(categContainer)
})
// #endregion all main categories


// #region add main category
addCategForm.addEventListener('submit', event => {
    event.preventDefault();

    const checkCategNameReturn = checkCategName(categoryNameInput)
    const checkCategImgReturn = checkCategImg(categImgInput)


    const formData = new FormData(addCategForm);
    const data = Object.fromEntries(formData)
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

                    // console.log(res.data.img)

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
let subcategoryNameInput = document.getElementById('subcateg-name')
let addSubcategBtn = document.getElementById('addSubcategBtn')

let subcategAlert = document.querySelector('.subcateg-added')

addSubcategForm.addEventListener('submit', event => {
    event.preventDefault()

    let checkCategNameReturn = checkCategName(subcategoryNameInput)

    let checkboxInputs = mainCategoriesContainer.querySelectorAll('input[type=checkbox]')
    let checkTextInputsReturn = checkCheckBoxInputs(checkboxInputs)

    let formData = new FormData(addSubcategForm);
    let data = Object.fromEntries(formData)
    console.log(data)

    let { name, ...obj } = data

    let mainIds = []
    for (let i in obj) {
        mainIds.push(obj[i])
    }

    let bodyData = { name, mainIds }

    const myHeaders = new Headers();
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(bodyData)
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

    if (checkCategNameReturn && checkTextInputsReturn) {
        fetch('http://localhost:5000/admin/add-sub-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    deleteFormError(addSubcategForm)
                    subcategAlert.innerHTML = addedSuccessfullyAlert

                    return res.json();
                } else {
                    setFormError(addSubcategForm, 'هذا القسم الفرعي موجود مسبقًا في القسم الأساسي الذي اخترته.', subcategoryNameInput)
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

})

// #endregion add subcategory

var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
