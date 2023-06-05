import { getCookie } from './cookies.js'
import { checkTextInputs, setFormError, deleteFormError } from './form-validation.js'
import { getMainCategories } from './get-main-categories-select.js';
import { getSubcategories } from './get-subcategories-select.js';

const userToken = 'user_access_token'


// redirect to login
!getCookie(userToken) ? location.href = 'user-login.html' : null;

// #region main categories select
const mainCategoriesContainer = document.querySelector('#main-categories-select')

document.addEventListener('DOMContentLoaded', getMainCategories(mainCategoriesContainer))
// #endregion main categories select

// #region subcategories select
const subcategoriesContainer = document.querySelector('#subcategories-select')

mainCategoriesContainer.addEventListener('change', e => {
    console.log(e.target.value)
    const mainCateg = e.target.value
    if (mainCateg) {
        getSubcategories(subcategoriesContainer, mainCateg)
    }
})
// #endregion subcategories select


// #region add book
const addBookForm = document.getElementById('add-book-form')
const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')
const authorNameInput = document.getElementById('authorName')
const langInput = document.getElementById('lang')
const pageNoInput = document.getElementById('pageNo')
const publishingHouseInput = document.getElementById('publishingHouse')
const imgInput = document.getElementById('img')
const bookInput = document.getElementById('book')
const releaseDateInput = document.getElementById('releaseDate')

const bookAlert = document.getElementById('book-added')

addBookForm.addEventListener('submit', event => {
    event.preventDefault();

    const textInputsValidation = checkTextInputs(
        [
            titleInput,
            descriptionInput,
            authorNameInput,
            langInput,
            pageNoInput,
            publishingHouseInput,
            imgInput,
            bookInput,
            releaseDateInput
        ])

    const isInputsValid = textInputsValidation.every(inputValid => inputValid)


    const formData = new FormData(addBookForm);
    formData.append('user', getCookie('userId'))

    const data = Object.fromEntries(formData)
    console.log(data)

    const myHeaders = new Headers();

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: formData
    }

    delete options.headers['Content-Type'];
    myHeaders.append('authorization', `Bearer ${getCookie(userToken)}`);

    const addedSuccessfullyAlert = `
    <div class="alert alert-success alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4> <i class="icon fa fa-check"></i> Alert!</h4>
        Book added successfully
    </div>`


    if (isInputsValid) {
        fetch('http://localhost:5000/user/add-new-book', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    deleteFormError(addBookForm)
                    bookAlert.innerHTML = addedSuccessfullyAlert

                    return res.json();
                } else {
                    setFormError(addBookForm, "لقد حدث خطأ ما. من فضلك حاول مرة أخرى.")
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
})
// #endregion add main category


// #region add subcategory
// let addSubcategForm = document.getElementById('add-subcategory-form')

// let subcategoryNameInput = document.getElementById('subcateg-name')
// let addSubcategBtn = document.getElementById('addSubcategBtn')

// addSubcategBtn.addEventListener('click', event => {
//     let checkCategNameReturn = checkCategName(subcategoryNameInput)

//     let formData = new FormData(addSubcategForm);
//     let data = Object.fromEntries(formData)
//     console.log(data)

//     const myHeaders = new Headers();

//     const options = {
//         method: 'POST',
//         headers: myHeaders,
//         body: JSON.stringify(data)
//     }

//     // delete options.headers['Content-Type'];
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

//     if (checkCategNameReturn) {
//         fetch('http://localhost:5000/admin/add-sub-categ', options)
//             .then(res => {
//                 console.log(res);
//                 if (res.status == 200) {
//                     deleteFormError(addSubcategForm)

//                     return res.json();
//                 } else {
//                     setFormError(addSubcategForm, 'هذا القسم الفرعي موجود مسبقًا في القسم الأساسي الذي اخترته.', subcategoryNameInput)
//                 }
//             })
//             .then(data => console.log(data))
//             .catch(err => console.log(err))
//     }

// })

// let addSubToMain = document.getElementById('addSubToMain')
// let subcategAlert = document.querySelector('.subcateg-added')

// addSubToMain.addEventListener('click', event => {
//     let checkSelectCategReturn = checkSelectCateg(mainCategoriesContainer.querySelector('select'))

//     let formData = new FormData(addSubcategForm);
//     let data = Object.fromEntries(formData)
//     console.log(data)

//     const myHeaders = new Headers();

//     const options = {
//         method: 'POST',
//         headers: myHeaders,
//         body: JSON.stringify(data)
//     }

//     // delete options.headers['Content-Type'];
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

//     const addedSuccessfullyAlert = `
//     <div class="alert alert-warning alert-dismissable">
//         <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
//         <h4> <i class="icon fa fa-check"></i> Alert!</h4>
//         Subcategory added successfully
//     </div>`


//     if (checkCategNameReturn) {
//         fetch('http://localhost:5000/admin/add-sub-to-main', options)
//             .then(res => {
//                 console.log(res);
//                 if (res.status == 200) {
//                     deleteFormError(addSubcategForm)
//                     subcategAlert.innerHTML = addedSuccessfullyAlert

//                     return res.json();
//                 } else {
//                     setFormError(addSubcategForm, 'هذا القسم الفرعي موجود مسبقًا في القسم الأساسي الذي اخترته.', subcategoryNameInput)
//                 }
//             })
//             .then(data => console.log(data))
//             .catch(err => console.log(err))
//     }

// })
    // #endregion add subcategory
