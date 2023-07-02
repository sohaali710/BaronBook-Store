import { getCookie } from '../../js/scripts/cookies.js'
import { checkCategName, checkCategImg, setFormError, deleteFormError, checkSelectCateg, checkTextInputs, checkCheckBoxInputs } from '../../js/scripts/form-validation.js'
import { getCategoriesAccordion } from './get-categories-accordion.js'
import { getMainCategories } from './get-main-categories-checkbox.js'

const adminToken = 'admin_access_token'

let addCategForm = document.getElementById('add-main-category-form')
let categoryNameInput = document.getElementById('categ-name')
let categImgInput = document.getElementById('categ-img')
let categAlert = document.querySelector('.categ-added')

// redirect to login
!getCookie(adminToken) ? location.href = 'admin-login.html' : null;

// #region all main categories
const mainCategoriesContainer = document.querySelector('#add-subcategory-form .main-categories')
let categContainer = document.querySelector('#accordionExample')

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
        fetch('http://191.101.232.235/api/admin/add-main-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    deleteFormError(addCategForm)
                    categAlert.innerHTML = addedSuccessfullyAlert

                    getCategoriesAccordion(categContainer)
                    addCategForm.reset()
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
        fetch('http://191.101.232.235/api/admin/add-sub-categ', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    deleteFormError(addSubcategForm)
                    subcategAlert.innerHTML = addedSuccessfullyAlert

                    getCategoriesAccordion(categContainer)
                    addSubcategForm.reset()
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



// #region edit mainCateg
let editCategForm = document.getElementById('edit-main-category-form')
let editCategNameInput = editCategForm.querySelector('#categ-name')
let editCategImgInput = editCategForm.querySelector('#categ-img')
let categImg = editCategForm.querySelector('.image')

categContainer.addEventListener('click', e => {
    if (e.target.matches('.accordion-button .fa-pen-to-square')) {
        const mainId = e.target.getAttribute('mainId')
        console.log(mainId)

        /** assign saved data to the inputs*/
        fetch(`http://191.101.232.235/api/main-categ-by-id/${mainId}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                let { name, img } = data.data
                console.log(data.data)
                img = img.replace('public', 'http://191.101.232.235/api')

                editCategNameInput.value = name
                categImg.innerHTML = `<img src="${img}" alt="category image"/>`

                let blob = new Blob([img], { type: "text/plain" });
                loadURLToInputFiled(img)
            });

        /**  edit main category*/
        editCategForm.addEventListener('submit', event => {
            event.preventDefault();

            const checkCategNameReturn = checkCategName(editCategNameInput)
            const checkCategImgReturn = checkCategImg(editCategImgInput)


            const formData = new FormData(editCategForm);
            formData.append('id', mainId)
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

            if (checkCategNameReturn && checkCategImgReturn) {
                fetch(`http://191.101.232.235/api/admin/edit-main-categ`, options)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            deleteFormError(addCategForm)

                            getCategoriesAccordion(categContainer)
                            addCategForm.reset()
                            return res.json();
                        } else {
                            setFormError(addCategForm, 'هذا القسم موجود بالفعل.', editCategNameInput, editCategImgInput)
                        }
                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
            }
        })
    }
})
// #endregion edit mainCateg

// #region edit subcateg
let editSubcategForm = document.getElementById('edit-subcategory-form')
let editSubcategNameInput = editSubcategForm.querySelector('#categ-name')

const mainCategCheckbox = document.querySelector('#exampleModal1 .main-categories')

categContainer.addEventListener('click', e => {
    if (e.target.matches('.subItem .fa-pen-to-square')) {
        const subId = e.target.getAttribute('subId')
        let checkbox = ''

        getMainCategories(mainCategCheckbox)

        /** assign saved data to the inputs*/
        fetch(`http://191.101.232.235/api/get-sub-categ-by-id/${subId}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                let { name, mainCateg } = data.data
                editSubcategNameInput.value = name

                mainCateg.forEach(main => {
                    checkbox = mainCategCheckbox.querySelectorAll('input[type=checkbox]')

                    checkbox.forEach(checkItem => {
                        if (checkItem.name == main.name) {
                            checkItem.checked = true
                        } else {
                            checkItem.checked = false
                        }

                    })

                })

            });

        /**  edit subcategory*/
        editSubcategForm.addEventListener('submit', event => {
            event.preventDefault();

            const checkSubcategNameReturn = checkTextInputs([editSubcategNameInput])

            let checkTextInputsReturn = checkCheckBoxInputs(checkbox)

            const formData = new FormData(editSubcategForm);
            const data = Object.fromEntries(formData)
            console.log(data)

            let { name, ...obj } = data

            let mainIds = []
            for (let i in obj) {
                mainIds.push(obj[i])
            }

            let bodyData = { name, mainIds, id: subId }
            console.log(bodyData)
            const myHeaders = new Headers();
            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(bodyData)
            }

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

            if (checkSubcategNameReturn && checkTextInputsReturn) {
                fetch(`http://191.101.232.235/api/admin/edit-sub`, options)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            deleteFormError(addSubcategForm)

                            getCategoriesAccordion(categContainer)
                            addSubcategForm.reset()
                            return res.json();
                        } else {
                            setFormError(addSubcategForm, 'هذا القسم موجود بالفعل.', editSubcategNameInput)
                        }
                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
            }
        })
    }
})
// #endregion edit subcateg


// #region delete main categ
const mainConfirmDelete = document.querySelector('#exampleModal3 #confirmDelete')

categContainer.addEventListener('click', e => {
    if (e.target.matches('.accordion-button .fa-xmark')) {
        const mainId = e.target.getAttribute('mainId')
        console.log(mainId)


        mainConfirmDelete.addEventListener('click', () => {
            const myHeaders = new Headers();
            myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

            const options = {
                method: 'GET',
                headers: myHeaders
            }

            fetch(`http://191.101.232.235/api/admin/delete-main/${mainId}`, options)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        getCategoriesAccordion(categContainer)
                        return res.json();
                    }
                })
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))

        })

    }
})
// #endregion delete main categ

// #region delete subcateg
const subConfirmDelete = document.querySelector('#exampleModal4 #confirmDelete')

categContainer.addEventListener('click', e => {
    if (e.target.matches('.subItem .fa-xmark')) {
        const subId = e.target.getAttribute('subId')
        console.log(subId)


        subConfirmDelete.addEventListener('click', () => {
            const myHeaders = new Headers();
            myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

            const options = {
                method: 'GET',
                headers: myHeaders
            }

            fetch(`http://191.101.232.235/api/admin/delete-sub/${subId}`, options)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        getCategoriesAccordion(categContainer)
                        return res.json();
                    }
                })
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))

        })

    }
})
// #endregion delete subcateg


// #region load img from database to input file
function getImgURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
function loadURLToInputFiled(url) {
    getImgURL(url, (blob) => {
        // Load img blob to input
        // WIP: UTF8 character error
        let fileName = url.split('uploads\\')[1].slice(0, -4)
        let file = new File([blob], fileName, { type: "image/jpg", lastModified: new Date().getTime() }, 'utf-8');
        let container = new DataTransfer();
        container.items.add(file);
        editCategImgInput.files = container.files;
    })
}
// #endregion load img from database to input file