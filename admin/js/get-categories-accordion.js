// in accordion [admin (show categories and its subcategories)]
import { getCookie } from "../../js/scripts/cookies.js"

let categoriesDiv = ''

function getCategoriesAccordion(container) {

  fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
    data.data.forEach(categ => {
      const { _id: categId, name: categName } = categ
      let subcategLis = ''

      fetch(`http://localhost:5000/get-subs-by-main/${categId}`).then(res => res.json()).then(data => {
        const subcategArr = data.data

        if (subcategArr.length) {
          subcategArr.forEach(subcateg => {
            const { name: subName } = subcateg

            subcategLis += `<li>${subName}</li>`

          })

          categoriesDiv += `
                          <div class="panel box box-primary">
                          <div class="box-header with-border">
                            <h4 class="box-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#${categName}">
                                ${categName}
                              </a>
                            </h4>
                          </div>
                          <div id="${categName}" class="panel-collapse collapse">
                            <div class="box-body">
                            <ul>`
            + subcategLis +
            `</ul>
                            </div>
                          </div>
                        </div>`
        } else {
          categoriesDiv += `
                          <div class="panel box box-primary">
                          <div class="box-header with-border">
                            <h4 class="box-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#${categName}">
                                ${categName}
                              </a>
                            </h4>
                          </div>
                          <div id="${categName}" class="panel-collapse collapse">
                            <div class="box-body">
                              <p class="text-center">There is no subcategories here</p>
                            </div>
                          </div>
                        </div>`
        }

        container.innerHTML = categoriesDiv
      })

    })
  })
}

export { getCategoriesAccordion }