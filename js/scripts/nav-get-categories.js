// in nav [user (show categories and its subcategories)]
import { getCookie } from "./cookies.js"

let categEle = ''

function navGetCategories(container) {

    fetch('http://191.101.232.235/api/all-main-categs').then(res => res.json()).then(data => {
        data.data.forEach((categ => {
            const { _id: categId, name: categName } = categ

            let subcategLis, ulOpeningTag, ulClosingTag = ''

            fetch(`http://191.101.232.235/api/get-subs-by-main/${categId}`).then(res => res.json()).then(data => {
                const subcategArr = data.data
                if (subcategArr.length) {
                    subcategArr.forEach((subcateg => {
                        const { _id: subId, name: subName } = subcateg

                        subcategLis += `<li><a href="books-in-subcategory.html?subId=${subId}?subName=${subName}">${subName}</a></li>`

                        ulOpeningTag = ` <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                            <ul class="mega-menu">`

                        ulClosingTag = `</ul>`
                    }))

                    categEle += `
                        <li><a href="books-in-main-category.html?mainId=${categId}?mainName=${categName}">${categName}`
                        + ulOpeningTag + subcategLis + ulClosingTag +
                        `</li>`
                } else {
                    categEle += `<li><a href="#">${categName}</a></li>`
                }

                container.innerHTML = categEle
            })

        }))
    })
}

const mainCategContainer = document.querySelector('.main-category')
navGetCategories(mainCategContainer)

// export { navGetCategories }