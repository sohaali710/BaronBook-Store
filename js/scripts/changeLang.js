import translation from "./translation.js"

let storedLanguage = localStorage.getItem('lang')
const langBtn = document.querySelector('.lang-btn')

document.addEventListener('DOMContentLoaded', () => {
    if (storedLanguage) {
        if (storedLanguage == 'fr') {
            langBtn.textContent = 'العربية'
            langBtn.setAttribute('data-change-lang', 'fr')
        } else {
            langBtn.textContent = 'French'
            langBtn.setAttribute('data-change-lang', 'ar')
        }

        setLanguage(storedLanguage)
    }
})

langBtn.addEventListener('click', (e) => {
    // toggle lang btn + its data-change-lang attribute
    if (e.target.getAttribute('data-change-lang') == 'fr') {
        langBtn.textContent = 'French'
        e.target.setAttribute('data-change-lang', 'ar')
    } else {
        langBtn.textContent = 'العربية'
        e.target.setAttribute('data-change-lang', 'fr')
    }

    setLanguage(e.target.getAttribute('data-change-lang'))

    localStorage.setItem('lang', e.target.getAttribute('data-change-lang'))
})

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]')

    elements.forEach(ele => {
        ele.childNodes[0].nodeValue = translation[lang][ele.getAttribute('data-lang')]

        // change lang in gender select O_O
        if (ele.parentElement.matches('#gender')) {
            const niceSelectDiv = document.getElementsByName('gender')[0].nextSibling
            const genderOptions = niceSelectDiv.querySelector('.list').children
            const selectedOption = niceSelectDiv.querySelector('.current')

            if (ele.getAttribute('data-lang') == 'male') {
                selectedOption.textContent = translation[lang][ele.getAttribute('data-lang')]
                selectedOption.classList.add('ar-font-style')
            }

            for (let i = 0; i < genderOptions.length; i++) {
                // console.log(ele.value == genderOptions[i].getAttribute('data-value'))
                if (ele.value == genderOptions[i].getAttribute('data-value')) {
                    genderOptions[i].textContent = translation[lang][ele.getAttribute('data-lang')]
                    genderOptions[i].classList.add('ar-font-style')
                }
            }
        }
        if (lang == 'ar') {
            ele.classList.add('ar-font-style')
        } else {
            ele.classList.remove('ar-font-style')
        }

    })
}