// in nav [user (show categories and its subcategories)]
import { getCookie } from "./cookies.js"

let categEle = ''

function navGetCategories(container) {

    fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach((categ => {
            const { _id: categId, name: categName } = categ

            let subcategLis, ulOpeningTag, ulClosingTag = ''

            fetch(`http://localhost:5000/get-subs-by-main/${categId}`).then(res => res.json()).then(data => {
                const subcategArr = data.data
                if (subcategArr.length) {
                    subcategArr.forEach((subcateg => {
                        const { name: subName } = subcateg

                        subcategLis += `<li><a href="#">${subName}</a></li>`

                        ulOpeningTag = ` <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                            <ul class="mega-menu">`

                        ulClosingTag = `</ul>`
                    }))

                    categEle += `
                        <li><a href="#">${categName}`
                        + ulOpeningTag + subcategLis + ulClosingTag +
                        `</li>`
                } else {
                    categEle += `<li><a href="#">${categName}</a></li>`
                }

                console.log(categEle)
                container.innerHTML = categEle
            })

        }))
    })
}

const mainCategContainer = document.querySelector('.main-category')
navGetCategories(mainCategContainer)

// export { navGetCategories }