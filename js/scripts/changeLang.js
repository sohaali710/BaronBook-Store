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
        ele.textContent = translation[lang][ele.getAttribute('data-lang')]
    })

    // document.dir = (lang == 'ar') ? 'rtl' : 'ltr';
}