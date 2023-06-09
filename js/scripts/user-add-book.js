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
const isAuthorInput = document.getElementById('isAuthor')
const authorNameInput = document.getElementById('authorName')
const langInput = document.getElementById('lang')
const pageNoInput = document.getElementById('pageNo')
const publishingHouseInput = document.getElementById('publishingHouse')
const releaseDateInput = document.getElementById('releaseDate')
const imgInput = document.getElementById('img')
const bookInput = document.getElementById('book')

const bookAlert = document.getElementById('book-added')

addBookForm.addEventListener('submit', event => {
    event.preventDefault();

    const textInputsValidation = checkTextInputs(
        [
            titleInput,
            descriptionInput,
            isAuthorInput,
            authorNameInput,
            langInput,
            pageNoInput,
            publishingHouseInput,
            releaseDateInput,
            imgInput,
            bookInput,
            mainCategoriesContainer,
            subcategoriesContainer
        ])

    const isInputsValid = textInputsValidation.every(inputValid => inputValid)


    const formData = new FormData(addBookForm);

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
        fetch('http://191.101.232.235/api/user/add-new-book', options)
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
// #endregion add book
