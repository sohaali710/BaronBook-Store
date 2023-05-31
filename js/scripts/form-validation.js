// const emailRegex = /^(?=[^@]{4,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{4,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/;
const emailRegex = /^[a-z0-9]+[.]?[a-z0-9]+@metu\.edu$/;
const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

let checkUsername = (nameInput) => {
    let flag = false
    if (nameInput.value === '') {
        setErrorFor(nameInput, 'من فضلك ادخل اسمك  .')
    } else {
        setSuccessFor(nameInput)
        flag = true
    }
    return flag
}

let checkEmail = (emailInput) => {
    let flag = false
    if (emailInput.value === '') {
        setErrorFor(emailInput, 'من فضلك ادخل عنوان بريدك الإلكتروني.')
    } else if (emailRegex.test(emailInput.value)) {
        setErrorFor(emailInput, 'البريد الإلكتروني يجب أن يحتوي على علامة @ و حرفين بعدها على الأقل.')
    } else {
        setSuccessFor(emailInput)
        flag = true
    }
    return flag
}

let checkPassword = (passwordInput) => {
    let flag = false
    if (passwordInput.value === '') {
        setErrorFor(passwordInput, 'من فضلك ادخل كلمة المرور.')
    } else if (passwordRegex.test(passwordInput.value)) {
        setErrorFor(passwordInput, 'كلمة المرور يجب ألا تقل عن 8 أحرف و تحتوي على الأقل على حرف إنجليزي كبير و حرف صغير و رقم و رمز .')
    } else {
        setSuccessFor(passwordInput)
        flag = true
    }
    return flag
}

let checkConfirmPass = (passwordInput, confirmPassInput) => {
    let flag = false
    if (confirmPassInput.value === '') {
        setErrorFor(confirmPassInput, 'من فضلك اعد ادخال كلمة المرور.')
    } else if (confirmPassInput.value !== passwordInput.value) {
        setErrorFor(confirmPassInput, 'كلمة المرور غير متطابقة. من فضلك اعد ادخالها مرة أخرى.')
    } else {
        setSuccessFor(confirmPassInput)
        flag = true
    }
    return flag
}

let checkGender = (genderInput) => {
    let flag = false
    if (genderInput.value === '') {
        setErrorFor(genderInput, 'من فضلك اختر النوع .')
    } else {
        setSuccessFor(genderInput)
        flag = true
    }
    return flag
}

let checkBirthdate = (birthdateInput) => {
    let flag = false
    if (birthdateInput.value === '') {
        setErrorFor(birthdateInput, 'من فضلك ادخل تاريخ الميلاد .')
    } else {
        setSuccessFor(birthdateInput)
        flag = true
    }
    return flag
}

let checkSelectCateg = (selectElement) => {
    let flag = false
    if (selectElement.value === '') {
        setErrorFor(selectElement, 'من فضلك اختر القسم.')
    } else {
        setSuccessFor(selectElement)
        flag = true
    }
    return flag
}


let setSuccessFor = (input) => {
    const formControl = input.parentElement

    formControl.className = "custom-form-control success"
}
let setErrorFor = (input, msg) => {
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText = msg

    formControl.className = "custom-form-control error"
}


function setFormError(formElement, msg, input1, input2) {
    if (arguments.length == 4) {
        if (input1.parentElement.classList.contains('success') && input2.parentElement.classList.contains('success')) {
            const formErrorMsg = formElement.querySelector('.formErrorMsg')
            formErrorMsg.innerText = msg

            formElement.classList.add('error')

            input1.parentElement.className = "custom-form-control error"
            input1.parentElement.querySelector('small').innerHTML = ''
            input2.parentElement.className = "custom-form-control error"
            input2.parentElement.querySelector('small').innerHTML = ''

        }
    } else if (arguments.length == 3) {
        if (input1.parentElement.classList.contains('success')) {
            const formErrorMsg = formElement.querySelector('.formErrorMsg')
            formErrorMsg.innerText = msg

            formElement.classList.add('error')

            input1.parentElement.className = "custom-form-control error"
            input1.parentElement.querySelector('small').innerHTML = ''
        }
    }
}

let deleteFormError = (formElement) => {
    formElement.querySelector('.formErrorMsg').innerHTML = ''
}


let deleteFormInputsError = (formElement) => {
    formElement.querySelectorAll('input').forEach((input) => {
        const formControl = input.parentElement
        const small = formControl.querySelector('small')

        small.innerText = ''

        formControl.className = "custom-form-control"
    })
}


/**add & update product form*/
let checkName = (nameInput) => {
    let flag = false
    if (nameInput.value === '') {
        setErrorFor(nameInput, 'ادخل اسم المنتج .')
    } else {
        setSuccessFor(nameInput)
        flag = true
    }
    return flag
}
let checkCategory = (categoryInput) => {
    let flag = false
    if (categoryInput.value === '') {
        setErrorFor(categoryInput, 'ادخل القسم الخاص بالمنتج .')
    } else {
        setSuccessFor(categoryInput)
        flag = true
    }
    return flag
}
let checkDescription = (descriptionInput) => {
    let flag = false
    if (descriptionInput.value === '') {
        setErrorFor(descriptionInput, 'ادخل وصف المنتج .')
    } else {
        setSuccessFor(descriptionInput)
        flag = true
    }
    return flag
}
let checkDetails = (detailsInput) => {
    let flag = false
    if (detailsInput.value === '') {
        setErrorFor(detailsInput, 'ادخل وصف المنتج .')
    } else {
        setSuccessFor(detailsInput)
        flag = true
    }
    return flag
}
let checkImgs = (imgsInput) => {
    let flag = false
    if (imgsInput.value === '') {
        setErrorFor(imgsInput, 'ادخل صور المنتج .')
    } else {
        setSuccessFor(imgsInput)
        flag = true
    }
    return flag
}


let checkCategName = (categoryNameInput) => {
    let flag = false
    if (categoryNameInput.value === '') {
        setErrorFor(categoryNameInput, 'ادخل اسم القسم .')
    } else {
        setSuccessFor(categoryNameInput)
        flag = true
    }
    return flag
}
let checkCategImg = (categImgInput) => {
    let flag = false
    if (categImgInput.value === '') {
        setErrorFor(categImgInput, 'ادخل صورة للقسم .')
    } else {
        setSuccessFor(categImgInput)
        flag = true
    }
    return flag
}


export {
    checkUsername, checkEmail, checkPassword, checkConfirmPass, checkGender, checkBirthdate, setFormError, deleteFormError,
    checkName, checkCategory, checkDescription, checkDetails, checkImgs,
    checkCategName, checkCategImg,
    checkSelectCateg,
    deleteFormInputsError
}